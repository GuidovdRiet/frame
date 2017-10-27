const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.homePage = (req, res) => {
    const object = {
        appel: 'Pink Lady'
    }
    res.json(object);
}
