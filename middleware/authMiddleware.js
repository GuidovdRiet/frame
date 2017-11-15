exports.ensureLoggedIn = (req, res, next) => {
    if (!req.user) {
        req.flash('error', 'You must be logged in to view this page');
        return res.redirect('back');
    }

    return next();
};
