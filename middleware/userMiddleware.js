const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.validateRegister = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'You must supply a name!').notEmpty();
    req.checkBody('email', 'Email is not valid').notEmpty();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'You must supply a password').notEmpty();
    req
        .checkBody('password-confirm', 'You have to confirm your password')
        .notEmpty();
    req
        .checkBody('password-confirm', 'Your passwords do not match')
        .equals(req.body.password);

    const errors = req.validationErrors();

    if (errors) {
        req.flash('error', errors.map(err => err.msg));
        res.render('register', {
            title: 'Register',
            body: req.body,
            messages: req.flash()
        });
        return;
    }
    next();
};

exports.register = async (req, res, next) => {
    const count = await User.count();
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        photo: req.body.photo,
        index: count + 1
    });
    const registerWithPromise = promisify(User.register, User);
    await registerWithPromise(user, req.body.password);
    next();
};
