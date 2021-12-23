const router = require('express').Router();
const { Cover } = require('../models/cover');
const fs = require('fs');

router.get('/:id', async (req, res) => {
    const cover = await Cover.findById(req.params.id);
    if(!cover) return res.status(404).send('File with id was not found');
    const readStream = await fs.createReadStream(cover.path);
    readStream.pipe(res);
});

module.exports = router;



