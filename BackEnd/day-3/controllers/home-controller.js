const fs = require('fs');
const mongoose = require('../mongooseConnector');

var userSchema = new mongoose.Schema({
    username    : {
        type: String,
        required : true,
        unique : true
    },
    password    : {
        type: String,
        required : true,
        select : false
    },
    age         : {
        type: Number,
        required : true
    },
    name        : {
        type: String,
        required : true
    },
    class       : {
        type: String,
        required : true
    }
});

var User = mongoose.model('User', userSchema);

var _makeSomeUsers = (req, res) => {
    fs.readFile("./users.json", (err, data) => {
        if(err) throw err;
        else {
            let dataJSON = JSON.parse(data);
            dataJSON.users.forEach((user, i) => {
                newUser = new User(user);
                newUser.save().then( (doc) => {
                    console.log(doc);
                }, (err)=> {
                    console.log(err);
                    res.status(400).send('Successful');
                });
            });
            res.status(201).json(dataJSON.users);
        }
    });
}

var _getUsers = (req, res) => {
    var promise = User.find({}, 
        {'_id' : 0, '__v' : 0}).exec();
    promise.then(( users) => {
        res.json(users);
    }, (err) => {
        console.log(err);
    })
}

var _createUser = (req, res) => {
    let newUser = new User(req.body);
    var promise = newUser.save();
    promise.then((doc) => {
        console.log(doc);
        res.status(201).send('Create Successful');
    }, (err) => {
        console.log(err);
        res.status(400).send(err);
    })
}

var _getUser = (req, res) => {
    username = req.params.username;
    var promise = User.find({username: username}, {'_id' : 0, '__v' : 0}).exec();
    promise.then((users) => {
        res.status(200);
        res.json(users[0]);
    }, (err) => {
        console.log(err);
        res.status(400).send(err);
    })
}

var _editUser = (req, res) => {
    let username = req.params.username;
    let newUser = req.body;
    var promise = User.update({username : username}, newUser).exec();
    promise.then((doc) => {
        console.log(doc);
        res.status(202).send('Edit Successful!');
    }, (err) => {
        console.log(err);
        res.status(500).send('Cannot Edit!');
    })
}

module.exports.getUsers = _getUsers
module.exports.getUser = _getUser
module.exports.createUser = _createUser
module.exports.editUser = _editUser
module.exports.makeSomeUsers = _makeSomeUsers