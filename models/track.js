const mongoose = require('mongoose');
const Joi = require('joi');

const trackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    artist: {
        type: String,
        required: true,
        mingLength: 2,
        maxLength: 30
    },
    language: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 25
    },
    genre: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    cover: {
        type: String,
        require: true,
        minLength: 4,
        maxLength: 30
    },
    trackName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    }
});

function validate(track) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        artist: Joi.string().min(3).max(30).required(),
        genre: Joi.objectId().required(),
        language: Joi.string().min(3).max(30).required(),
        cover: Joi.string().min(4).max(30).required(),
        trackName: Joi.string().min(3).max(30).pattern(new RegExp('(\.|\/)(mp3)$', 'i'))
    });

    return schema.validate(track);
}

const Track = mongoose.model("Track", trackSchema);

module.exports = { Track, validate };
