const express = require('express');

const router = express.Router();

var controller = require('./instructor.controller');

router.get('/all', controller.getAll);

router.get('/name/:name', controller.getByName);

router.post('/create', controller.create);

router.post('/sida', controller.sida);

router.put('/edit/', controller.edit);

router.delete('/delete/:name', controller.delete);

module.exports = router;