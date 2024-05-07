const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
});

const UserModel = mongoose.model('User', UserSchema); // Pass 'User' as the model name
module.exports = UserModel;
