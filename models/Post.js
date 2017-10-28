const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'You have to enter a title',
        maxlength: [
            200,
            'The title of your idea must be {MAXLENGTH} characters or less.'
        ],
        trim: true
    },
    body: {
        type: String,
        required: 'You have to enter content',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);
