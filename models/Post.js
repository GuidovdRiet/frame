const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'You have to enter a title',
        maxlength: [
            200,
            'The title of your idea must be {MAXLENGTH} characters or less.'
        ]
    },
    author: {
        ref: 'User',
        type: mongoose.Schema.ObjectId,
        required: 'You must supply an author'
    },
    body: {
        type: String,
        required: 'You have to enter content'
    }
});

module.exports = mongoose.model('Post', postSchema);
