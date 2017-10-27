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
    body: {
        type: String,
        required: 'You have to enter content'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);
