const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const router = express.Router();

const HomeController = require('./home-controller');

router.use(bodyParser.json());

router.get('/', HomeController.getUsers);

router.get('/getUser/:username', HomeController.getUser);

router.post('/makeNew', HomeController.createUser);

module.exports = router;