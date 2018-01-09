const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
        required: 'Please enter an email address'
    },
    name: {
        type: String,
        required: 'Please supply a name',
        trim: true
    },
    photo: {
        type: String,
        required: 'Please supply a photo'
    },
    following: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    followers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    index: {
        type: Number
    }
});

// Zoek alle berichten van de gebruikers die in following staan

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
