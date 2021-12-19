const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);
const config = require('config');
const genres = require('./routes/genres');
const tracks = require('./routes/tracks');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use('/api/genres', genres);
app.use('/api/tracks', tracks);


mongoose.connect(config.get("mongoURI"))
.then(() => console.log("Connected to mongoDB..."))
.catch(err => console.log('FATAL ERROR : Failed to connect to mongoDB', err));


app.get('/', (req, res) => { 
    res.send("Welcome to vibes");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
