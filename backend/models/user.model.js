const mongoose = require('mongoose');

// Getting new mongoose schema
const Schema = mongoose.Schema;

// UserSchema with single field, username, with databases, trim means light spaces at the end. timestamps automatically create field for where it was created and modified, minlegth, not less than 3
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;