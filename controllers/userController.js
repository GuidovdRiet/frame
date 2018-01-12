const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
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

exports.show = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    const followingUsers = req.user.following;
    const followingUsersIds = followingUsers.map(followingUserId =>
        ObjectId(followingUserId));
    const posts = await Post.find({ author: { $in: followingUsersIds } });
    const displayUserButtons = true;
    res.render('profile', {
        user,
        posts,
        displayUserButtons,
        title: 'profile'
    });
};

exports.followUser = async (req, res) => {
    const userToFollow = await User.findOne({ _id: req.params.id });

    const following = req.user.following.map(obj => obj.toString());
    const operatorOne = following.includes(userToFollow._id.toString())
        ? '$pull'
        : '$addToSet';
    await User.findByIdAndUpdate(
        req.user._id,
        { [operatorOne]: { following: userToFollow._id } },
        { new: true }
    );

    const followers = userToFollow.followers.map(obj => obj.toString());
    const operatorTwo = followers.includes(req.user._id.toString())
        ? '$pull'
        : '$addToSet';
    const currentViewedUser = await User.findByIdAndUpdate(
        userToFollow._id,
        { [operatorTwo]: { followers: req.user._id } },
        { new: true }
    );

    if (userToFollow._id.equals(req.user._id)) {
        req.flash('error', "You can't follow yourself");
        res.redirect('back');
    }

    res.json(currentViewedUser);
};
