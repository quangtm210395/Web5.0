const fs = require('fs');

var _getUsers = (req, res) => {
    fs.readFile(__dirname + '/' + 'users.json', (err, data) => {
        if (err) {
            throw err;
            res.end(err);
        } else {
            res.end(data);
        }
    });
}

var _isExist = (arr, username) => {
    let check = -1;
    arr.forEach((user, i) => {
        if (user.username == username){
            check = i;
        } 
    });
    return check;
}

var _createUser = (req, res) => {
    fs.readFile('./users.json', (err, data) => {
        if (err) res.end(err);
        else {
            let dataJSON = JSON.parse(data);
            let newUser = req.body;
            let i = _isExist(dataJSON.users, newUser.username);
            if (i != -1) {
                dataJSON.users[i] = newUser;
            } else {
                dataJSON.users.push(newUser);
            }
            fs.writeFile('users.json', JSON.stringify(dataJSON), (err) => {
                if (err) throw err;
            })

            res.json(dataJSON);
        }
    });
}

module.exports.getUsers = _getUsers
module.exports.createUser = _createUser