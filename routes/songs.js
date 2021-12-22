const { Song, validate } = require('../models/song');
const router = require('express').Router();
const { upload, getFileStream } = require('../aws/s3');

router.get('/:key', async (req, res) => {
    const readStream = getFileStream(req.params.key);
    readStream.pipe(res);
});

router.get('/', async (req, res) => {
    const songs = await Song.find({});
    res.send(songs);
});

router.post('/', upload.array('song', 2), async (req, res) => {
    const songMetadata = {
        name: req.body.name,
        artist: req.body.artist,
        coverKey: "",
        coverLocation: "",
        songKey: "",
        songLocation: "",
        mimetype: "",
        genre : mongoose.Types.ObjectId(req.body.genre),
        createAt: Date.now()
    }


    for (let file of req.files) {
        const type = file.mimetype.split('/')[0];
        if (type === 'image'){
            songMetadata.coverKey = file.key;
            songMetadata.coverLocation = file.location
        } else if (type === "audio") {
            songMetadata.songKey = file.key;
            songMetadata.songLocation = file.location;
            songMetadata.mimetype = file.mimetype;
            songMetadata.size = file.size;
        }     
    };

    let song = new Song(songMetadata);
    song = await song.save();
    res.send(song);
});

module.exports = router;