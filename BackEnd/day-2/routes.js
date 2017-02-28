const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const router = express.Router();

const HomeController = require('./homeController')

router.use( (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})

router.get('/', HomeController.getUsers);

router.post('/makeNew', bodyParser.json(), HomeController.createUser);

module.exports = router;