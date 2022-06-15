const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// We have four fileds here, for this all the information we are going to store about the exercises
const exerciseSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;