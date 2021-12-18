const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validate(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required()
    });

    return schema.validate(genre);
}

module.exports = { validate, Genre };


