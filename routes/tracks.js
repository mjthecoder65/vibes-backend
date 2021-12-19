const router = require('express').Router();
const { validate, Track } = require('../models/track');

router.get('/', async (req, res) => {
    const tracks = await Track.find();
    res.send(tracks); 
});

router.get('/:id', async (req, res) => {
    const track = await Track.findById(req.params.id);
    if (!track) return res.status(404).send("Track with id was not found");
    res.send(track);  
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    let track = new Track({
        name: req.body.name,
        artist: req.body.artist,
        language: req.body.language,
        genre: mongoose.Types.ObjectId(req.body.genre),
        cover: req.body.cover,
        trackName: req.body.trackName
    });

    track = await track.save();
    res.send(track);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    const track = await Track.findByIdAndUpdate(req.params.id, { name : req.body.name }, { new : true});

    if (!track) return res.status(404).send("Track with that id was not found");
    res.send(track);

});

router.delete('/:id', async (req, res) => {
    const track = await Track.findByIdAndRemove(req.params.id);
    if (!track) return res.status(404).send('Track with that id was not found');
    res.send(track);
});

module.exports = router;