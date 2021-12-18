
const config = require('config');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use('/api/genres', genres);

app.get('/', (req, res) => { 
    res.send("Welcome to vibes");
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
