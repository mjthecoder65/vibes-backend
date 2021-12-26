const { Song } = require('../models/song');
const { Cover } = require('../models/cover');
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const mimetypeForImages = [
            'image/jpeg','image/png', 'image/jpg'
        ];
        
        if (mimetypeForImages.includes(file.mimetype)) {
            cb(null, path.join(__dirname, '..', 'covers'));
        } else if (new RegExp(/audio/).test(file.mimetype)) {
            cb(null, path.join(__dirname, '..', 'musics'));
        }

    },
    filename: function(req, file, cb) {
        const movieId = mongoose.Types.ObjectId();
        const extension = file.originalname.split('.')[1];
        file._id = movieId;
        cb(null, `${movieId.toString()}.${extension}`);
    }
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
    const songs = await Song.find({});
    res.send(songs);
});

router.get('/:id', async (req, res) => {
    const song = await Song.findById(req.params.id);

    if (req.headers.range) {;
        const range = req.headers.range;
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0]);
        const end = parts[1] ? parseInt(parts[1]) : song.size - 1;
        const CHUNK_SIZE  = 1024 * 1024;
        const headers = {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + song.size,
            'Accept-Ranges': 'bytes', 
            'Content-Length': CHUNK_SIZE,
            'Content-Type': 'audio/mpeg'
        };

        res.writeHead(206, headers);
        fs.createReadStream(song.path, { start, end}).pipe(res); 
     }
});

router.post('/',  upload.any(), async (req, res) => {
    if (req.files) {
        let song = {
            name: req.body.name,
            artist: req.body.artist,
            genre: mongoose.Types.ObjectId(req.body.genre)
        }

        let cover = {};
        for (let file of req.files) {
            const audioPattern = /audio/;
            const imagePattern = /image/;

            if (audioPattern.test(file.mimetype)) {
                song.path = file.path;
                song._id =  file._id,
                song.size = file.size;
                song.mimetype = file.mimetype;
            } else if (imagePattern.test(file.mimetype)) {
                song.cover = file._id;
                cover._id = file._id;
                cover.path = file.path;
                cover.size = file.size;
                cover.mimetype = file.mimetype;
            }
        }
        // TODO : How to handle two database requests at the time?
        song = new Song(song);
        await song.save();
        cover = new Cover(cover);
        await cover.save();
        res.send(song);

    } else {
        res.status(400).send('Please Upload files');
    }
});

// Need to be handled carefully.
router.delete('/:id', async (req, res) => {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).send("Song with id was not found");
    const cover = await Cover.findById(song.cover);

    fs.unlink(song.path, async (error) =>{
        if (error) return res.status(500).send("Internal server error");
        await Song.findByIdAndRemove(req.params.id);
    });

     fs.unlink(cover.path, async (error) => {
        if (error) return res.status(500).send("Internal server error");
        await Cover.findByIdAndRemove(cover._id);
    });

    res.send(song);
});

module.exports = router;