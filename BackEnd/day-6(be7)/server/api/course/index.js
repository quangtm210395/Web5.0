const express = require('express');

const router = express.Router();

var controller = require('./course.controller');

router.get('/all', controller.getAll);

router.get('/getByName/:name', controller.getCourse);

router.post('/create', controller.create);

router.post('/sida', controller.sida);

router.put('/edit/', controller.edit);

router.delete('/delete/:name', controller.delete);

module.exports = router;