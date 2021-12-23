const { User } = require('../models/user');
const router = require('express').Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid Email or Password");

   const validPassword =  await bcrypt.compare(req.body.password, user.password);
   if (!validPassword) return res.status(400).send("Invalid Email or Password");
   const token = user.generateAuthToken();
   res.send(token);
});

function validate(req) {
    const complexityOptions = {
        min: 8,
        max: 255,
        uppercase: 1,
        lowercase: 1,
        numeric: 1,
        symbol: 1
    }

    const schema = Joi.object({
        email: Joi.string().min(5).max(255).email({ minDomainSegments : 2, tlds: { allow : ['com', 'net']}}).required(),
        password: passwordComplexity(complexityOptions)
    });
    
    return schema.validate(req);
}

module.exports = router;