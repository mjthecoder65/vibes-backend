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
    },

    genre : {
        type: mongoose.Types.ObjectId,
        required: true
    },
    createAt: {
        type: Number,
        default: Date.now(),
        required: true
    }
});

function validate(song) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        genre: Joi.objectId().required(),
    });

    return schema.validate(song);
}

const Song = mongoose.model('Song', songSchema);

module.exports = { Song, validate };



