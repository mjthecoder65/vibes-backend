const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);
const config = require('config');
const genres = require('./routes/genres');
const songs = require('./routes/songs');
const users = require('./routes/users');
const auth = require('./routes/auth');
const covers = require('./routes/covers');
const path = require('path');
const express = require('express');
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error("FATAL ERROR: jwtPrivateKey is not defined");
    process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/auth', auth);
app.use('/api/genres', genres);
app.use('/api/songs', songs);
app.use('/api/users', users);
app.use('/api/covers', covers);

mongoose.connect(config.get("mongoURI"))
.then(() => console.log("Connected to mongoDB..."))
.catch(err => console.log('FATAL ERROR : Failed to connect to mongoDB', err));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
