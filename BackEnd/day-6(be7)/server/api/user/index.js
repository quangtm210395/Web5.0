const express = require('express');

const router = express.Router();

var controller = require('./user.controller');

router.get('/all', controller.getAll);

router.get('/username/:username', controller.getUserByUsername);

router.post('/sida', controller.sida);

router.post('/create', controller.create);

router.put('/edit', controller.edit);

router.delete('/delete/:username', controller.delete);

module.exports = router;