const mongoose = require('mongoose');
const Joi = require('joi');

const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 255
    },
    artist : {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 255
    },
    coverKey: {
        type: String,
        required: true,
        minLength:2,
        maxLength: 255
    },
    coverLocation: {
        type: String,
        required: true,
        minLength:2,
        maxLength: 255
    },
    songKey: {
        type: String,
        required: true,
        minLength:2,
        maxLength: 255
    },
    songLocation: {
        type: String,
        required: true,
        minLength:2,
        maxLength: 255
    },

    size: {
        type: Number,
        required: true,
        min: 2
    },

    mimetype: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 10
    }
});

const Song = mongoose.model('Song', songSchema);

module.exports = { Song };



