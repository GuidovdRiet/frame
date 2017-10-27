const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.homePage = (req, res) => {
    const object = {
        appel: 'Pink Lady'
    }
    res.json(object);
}

exports.createPost = (req, res) => {
    res.render('add_post', { title: 'Add an post' });
}
