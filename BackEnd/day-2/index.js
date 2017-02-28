const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

const router = require('./routes')

const port = 6969;

app.use('/', router);
app.use(bodyParser.json());

var server = app.listen(port, () => {
    console.log(`Server running at localhost: ${port}`);
});