const fs = require('fs');

var User = require('./user.model');

module.exports = {
    getAll: (req, res) => {
        User.find((err, users) => {
            if (err) throw err;
            else {
                res.status(200).json(users);
            }
        })
    },

    create: (req, res) => {
        if (req.body) {
            var user = new User(req.body);
            user.save().then(
                (insertedUser) => {
                    console.log("create successful!");
                    res.status(200).json({
                        message: "Create successful!",
                        insertedUser: insertedUser
                    })
                }, (err) => {
                    throw err;
                    res.status(400).send("Create Failed!");
                }
            );
        } else {
            res.status(400).send("Create Failed!");
        }
    },

    getUserByUsername: (req, res) => {
        if (req.body) {
            User.findOne({
                username: req.params.username
            }).then(
                (user) => {
                    res.status(200).json(user);
                }, (err) => {
                    throw err;
                    res.status(400).send("Not found!");
                }
            );
        } else {
            res.status(400).send("Not Found!");
        }
    },

    edit: (req, res) => {
        if (req.body) {
            User.findOne({
                username: req.body.username
            }).then(
                (user) => {
                    user.username = req.body.username;
                    user.password = req.body.password;
                    user.name = req.body.name;
                    user.age = req.body.age;
                    user.role = req.body.role;
                    user.save((err, updatedUser) => {
                        if (err) {
                            throw err;
                            res.status(400).send('Cannot edit!');
                        } else {
                            res.status(200).json({
                                message: "Edit successful!",
                                updatedUser: updatedUser
                            });
                        }
                    });
                }, (err) => {
                    throw err;
                    res.status(400).send('Cannot Edit!');
                }
            );
        } else {
            res.status(400).send('Cannot Edit!');
        }
    },

    delete: (req, res) => {
        User.findOne({
                username: req.params.username
            })
            .then(
                (user) => {
                    User.remove({username: user.username}, (err) => {
                        if (err) {
                            throw err;
                            res.status(400).send('Cannot delete!');
                        } else {
                            res.status(200).send('Delete successful!');
                        }
                    });
                }, (err) => {
                    throw err;
                    res.status(400).send('Cannot delete!');
                }
            );
    },

    sida: (req, res) => {
        fs.readFile(__dirname + '/../../users.json', (err, data) => {
            if (err) throw err;
            else {
                let dataJSON = JSON.parse(data);
                dataJSON["users"].forEach((item, i) => {
                    var user = new User(item);
                    user.save().then(
                        (doc) => {
                            console.log(doc);
                            res.status(200).send('Insert successful!');
                        }, (err) => {
                            console.log(err);
                            res.status(400).send('Insert Failed!');
                        }
                    );
                });
            }
        });
    }
}