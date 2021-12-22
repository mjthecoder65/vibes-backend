const mongoose = require('mongoose');
const Joi = require('joi');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 255
    }
});

const User = mongoose.model("User", userSchema);

function validate(user) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email({ minDomainSegments : 2, tlds: { allow : ['com', 'net']}}).required()
    });

    return schema.validate(user);
}


module.exports = { validate, User };