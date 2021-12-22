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
        unique: true,
        minLength: 5,
        maxlength: 255
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
        email: Joi.string().min(5).max(255).email({ minDomainSegments : 2, tlds: { allow : ['com', 'net']}}).required(),
        password:Joi.string().min(5).max(255).required()
    });

    return schema.validate(user);
}

module.exports = { validate, User };