const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
const config = require('config');

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
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin }, config.get("jwtPrivateKey"));
}

const User = mongoose.model("User", userSchema);

function validate(user) {
    const complexityOptions = {
        min: 8,
        max: 30,
        uppercase: 1,
        lowercase: 1,
        numeric: 1,
        symbol: 1
    }
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(5).max(255).email({ minDomainSegments : 2, tlds: { allow : ['com', 'net']}}).required(),
        password: passwordComplexity(complexityOptions).required(),
    });

    return schema.validate(user);
}

module.exports = { validate, User };