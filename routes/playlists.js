const { Playlist, validate } = require('../models/playlist');
const router = require('express').Router();
const { User } = require('../models/user');
const { Song } = require('../models/song');

router.get('/:id', async (req, res) =>{
    const playlists = await Playlist.find({ _id: params.id });
    res.send(playlists);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findBydId(req.body.user);
    if (!user) return res.status(404).send("User with provided id was not found");

    let playlist = new Playlist({
        name: req.body.name,
        user: req.body.user
    });

    playlist = await playlist.save();
    res.send(playlist);
});


// TODO
router.put('/:id', async (req, res) => {
    const song = await Song.find(req.body.songId);
    if (!song) return res.status(404).send('Song with provided id was not found');
    const playlist = await Playlist.findBydId(req.params.id);

    if (!playlist) return res.status(404).send("Playlist with id was not found");

    playlist.songs.push(req.body.songId);

    await playlist.save();

    res.send(playlist);
});

router.delete('/:id', async (req, res) => {
    const playlist = await Playlist.findByIdAndRemove(req.params.id);
    if (!playlist) res.status(404).send("Playlist with id was not found");

    res.send(playlist);
});









