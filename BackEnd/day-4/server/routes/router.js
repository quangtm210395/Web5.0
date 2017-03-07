const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const router = express.Router();

const HomeController = require('../controllers/controller');

router.use(bodyParser.json());

router.get('/test', HomeController.getTests);

router.post('/answer', HomeController.answer);

router.post('/insertToDB', HomeController.insertToDB);



module.exports = router;