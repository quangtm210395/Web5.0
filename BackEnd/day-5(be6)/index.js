const express = require('express');
const app = express();

const port = 6969;

app.get('/', (req, res) => {
    res.end('Hello');
});

var server = app.listen(port, () => {
    console.log(`Server running at localhost:${port} `);
});
