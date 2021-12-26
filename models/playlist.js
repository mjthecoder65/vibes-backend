const mongoose = require('mongoose');
const Joi = require('joi');

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    songs: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

function validate(playlist) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        user: Joi.objectId().required()
    });

    return schema.validate(playlist);
}

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = { Playlist, validate };


