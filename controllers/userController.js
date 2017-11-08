const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true);
        } else {
            next({ message: "That filetype isn't allowed" });
        }
    }
};

exports.upload = multer(multerOptions).single('photo');
exports.resize = async (req, res, next) => {
    if (!req.file) {
        return next();
    }
    // get file type extension
    const fileExtension = req.file.mimetype.split('/')[1];
    req.body.photo = `${uuid.v4()}.${fileExtension}`;
    // resize photo
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/uploads/${req.body.photo}`);
    return next();
};

exports.loginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

exports.registerForm = (req, res) => {
    res.render('register', { title: 'Register' });
};