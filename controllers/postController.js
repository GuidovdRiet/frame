const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const { ObjectId } = require('mongodb');

exports.homePage = async (req, res) => {
    // Get ideas from following users
    if (!req.user) {
        res.render('index', { title: 'index' });
        return;
    }
    const followingUsers = req.user.following;
    const followingUsersIds = followingUsers.map(followingUserId =>
        ObjectId(followingUserId));
    const posts = await Post.find({ author: { $in: followingUsersIds } });
    const displayUserButtons = false;
    res.render('index', { title: 'index', posts, displayUserButtons });
};

exports.addPost = (req, res) => {
    res.render('add_post', { title: 'Add an post' });
};

exports.createPost = async (req, res) => {
    req.body.author = req.user._id;
    await new Post(req.body).save();
    req.flash('success', 'You have created a new post!');
    res.redirect('/');
};

exports.editPost = async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    res.render('edit_post', { title: `${post.title}`, post });
};

exports.updatePost = async (req, res) => {
    await Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    }).exec();
    res.redirect('back');
};

exports.deletePost = async (req, res) => {
    await Post.findOneAndRemove({ _id: req.params.id });
    res.redirect('back');
};
