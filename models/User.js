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
    }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
userSchema.plugin(mongodbErrorHandler) // make mongoDB errors pretty 

module.exports = mongoose.model('User', userSchema);