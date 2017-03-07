const express = require('express');
const app = express();
const fs = require('fs');

const router = require(__dirname + '/routes/router')

const port = 6969;

app.use(express.static(__dirname+ "/../client"));

app.use('/', router);

app.get('/', (req, res) => {
    res.sendFile('../client/index.html');
})

var server = app.listen(port, () => {
    console.log(`Server running at localhost:${port} `);
});