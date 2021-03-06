const fs = require('fs');

var User = require('./user.model');
var jwt = require('jsonwebtoken');
var config = require('../../configs');

module.exports = {
    login: (req, res) => {
        if (req.body) {
            User.findOne({
                    username: req.body.username
                })
                .exec((err, user) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json({
                            status: false,
                            msg: err
                        });
                    }
                    if (!user) res.status(404).json({
                        status: false,
                        msg: "This account is not register"
                    });
                    else {
                        if (user.authenticate(req.body.password)) {
                            var token = jwt.sign({
                                data: user
                            }, config.secret, {
                                expiresIn: '10m'
                            });
                            res.status(202).json({
                                status: true,
                                msg: "Login successful",
                                token: token
                            });
                        } else {
                            res.status(403).json({
                                status: false,
                                msg: "Password incorrect"
                            });
                        }
                    }
                });
        } else {
            res.status(404).json({
                status: false,
                msg: "Cannot login!"
            })
        }

    },
    getAll: (req, res) => {
        User.find({
                isDeleted: {
                    $ne: true
                }
            }).sort('username')
            .populate({
                path: 'created',
                select: "name _id"
            })
            .exec((err, data) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({
                        status: false,
                        msg: "Not Found!"
                    });
                }
                res.json(data);
            });
    },

    create: (req, res) => {
        if (req.body) {
            var user = new User(req.body);
            console.log(req.body);
            user.save((err, user) => {
                if (err) console.log(err);
                else {
                    console.log('create successful!');
                    res.status(201).json({
                        status: true,
                        insertedUser: user
                    });
                }
            });
        } else {
            res.status(400).json({
                status: false,
                msg: "Cannot create!"
            });
        }
    },

    getUserByUsername: (req, res) => {
        if (req.params.username) {
            User.findOne({
                    username: req.params.username
                })
                .select('-_id')
                .populate({
                    path: 'created',
                    select: "name _id"
                })
                .populate({
                    path: 'created_instructor',
                    select: "name _id"
                })
                .exec((err, data) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json({
                            status: false,
                            msg: "Not Found!"
                        });
                    }
                    res.json(data);
                });
        } else {
            res.status(400).json({
                status: false,
                msg: "Not Found!"
            });
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
                    user.created = req.body.created;
                    user.created_instructor = req.body.created_instructor;
                    user.permission = req.body.permission;
                    user.isDeleted = req.body.isDeleted;
                    user.save((err, updatedUser) => {
                        if (err) {
                            throw err;
                            res.status(400).json({
                                status: false,
                                msg: 'Update Failed!'
                            });
                        } else {
                            res.status(200).json({
                                status: true,
                                msg: "Edit successful!",
                                updatedUser: updatedUser
                            });
                        }
                    });
                }, (err) => {
                    console.log(err);
                    res.status(400).json({
                        status: false,
                        msg: 'Cannot Edit!'
                    });
                }
            );
        } else {
            res.status(400).json({
                status: false,
                msg: 'Please input data to update'
            });
        }
    },

    delete: (req, res) => {
        if (req.params.username) {
            User.findOne({
                    username: req.params.username
                })
                .then(
                    (user) => {
                        User.remove({
                            username: user.username
                        }, (err) => {
                            if (err) {
                                console.log(err);
                                res.status(400).json({
                                    status: false,
                                    msg: 'Cannot delete!'
                                });
                            } else {
                                res.status(200).json({
                                    status: true,
                                    msg: 'Delete successful!'
                                });
                            }
                        });
                    }, (err) => {
                        throw err;
                        res.status(400).json({
                            status: false,
                            msg: 'Cannot delete!'
                        });
                    }
                );
        } else {
            res.status(400).json({
                status: false,
                msg: "Not Found to delete!"
            });
        }
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