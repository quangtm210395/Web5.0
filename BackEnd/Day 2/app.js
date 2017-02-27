const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const fs = require('fs');

const port = 6969;

app.use(router);
app.use(bodyParser.json());

var newUser = {
    "name": "quang",
    "password": "password3",
    "profession": "laptrinhvien",
    "id": 4
}

router.post('/createUser', bodyParser.json(), (req, res) => {
    fs.readFile('./user.json', (err, data) => {
        if (err) res.end(err);
        else {
            let dataJSON = JSON.parse(data);
            dataJSON['user4'] = req.body;
            console.log(user4);
            res.json(dataJSON);
        }
    });
});

router.get('/getUser', (req, res) => {
    fs.readFile(__dirname + '/' + 'user.json', (err, data) => {
        if (err) {
            throw err;
            res.end(err);
        } else {
            res.end(data);
        }
    });
});

var server = app.listen(port, () => {
    console.log(`Server running at localhost: ${port}`);
});
