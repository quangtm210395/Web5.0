const fs = require('fs');

var _isExist = (arr, username) => {
    let check = -1;
    arr.forEach((user, i) => {
        if (user.username == username){
            check = i;
        } 
    });
    return check;
}

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
                if (err) res.end(err);
            })

            res.json(dataJSON);
        }
    });
}

var _getUser = (req, res) => {
    fs.readFile(__dirname + '/' + 'users.json', (err, data) => {
        if (err) {
            throw err;
            res.end(err);
        } else {
            let dataJSON = JSON.parse(data);
            username = req.params.username;
            dataJSON.users.forEach((user, i) => {
                if(user.username == username) {
                    res.json(user);
                }
            });
        }
    });
}

var _editUser = (req, res) => {
    fs.readFile('./users.json', (err, data) => {
        if (err) res.end(err);
        else {
            let username = req.params.username;
            let dataJSON = JSON.parse(data);
            let newUser = req.body;
            let i = _isExist(dataJSON.users, username);
            console.log(i);
            if (i != -1) {
                dataJSON.users[i] = newUser;
            } else {
                dataJSON.users.push(newUser);
            }
            fs.writeFile('users.json', JSON.stringify(dataJSON), (err) => {
                if (err) res.end(err);
            })

            res.json(dataJSON);
        }
    });
}

module.exports.getUsers = _getUsers
module.exports.getUser = _getUser
module.exports.createUser = _createUser
module.exports.editUser = _editUser