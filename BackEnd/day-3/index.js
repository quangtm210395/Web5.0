const express = require('express');
const app = express();
const fs = require('fs');

const router = require('./routes/router')

const port = 6969;

app.use('/', router);

var server = app.listen(port, () => {
    console.log(`Server running at localhost:${port} 
    access localhost:${port}/makeSomeUsers for first time to create some users to db!`);
});