const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const router = express.Router();

const HomeController = require('../controllers/home-controller');

router.use(bodyParser.json());

router.get('/', HomeController.getUsers);

router.get('/getUser/:username', HomeController.getUser);

router.post('/createUser', HomeController.createUser);

router.put('/editUser/:username', HomeController.editUser);

module.exports = router;