const mongoose = require('mongoose');

const coverSchema = new mongoose.Schema({
    mimetype: {
        type: String,
        minLength: 3,
        maxlength: 10,
        required: true
    },
    size: {
        type: Number,
        min: 0,
        max: 100000,
        required: true
    },
    path: {
        type: String,
        minLength: 3,
        maxLength: 5000,
        required: true
    }
});

const Cover = mongoose.model('Covers', coverSchema);

module.exports  = { Cover };


