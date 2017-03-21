const fs = require('fs');
const async = require('async');

var Course = require('./course.model');
var User = require('../user/user.model');
var Instructor = require('../instructor/instructor.model');

module.exports = {
    getAll: (req, res) => {
        Course.find().sort('name')
            .populate({
                path: 'created_by',
                select: "username"
            })
            .exec((err, data) => {
                res.json(data);
            });
    },

    create: (req, res) => {
        if (req.body) {
            var course = new Course(req.body);
            var promise = course.save();
            promise.then((course) => {
                async.parallel({
                    one: (callback) => {
                        if (course.created_by) {
                            User.findById(course.created_by, (err, user) => {
                                if (err) {
                                    console.log(err);
                                    callback(null, 1);
                                } else {
                                    user.created.push(course._id);
                                    user.save((err, updatedUser) => {
                                        if (err) {
                                            console.log(err);
                                            callback(null, 1);
                                        }
                                        callback(null, 1);
                                    });
                                }

                            });
                        } else callback(null, 1);
                    },
                    two: (callback) => {
                        if (course.instructors) {
                            async.each(course.instructors, (instructorId, cb) => {
                                Instructor.findById(instructorId, (err, instructor) => {
                                    if (err) {
                                        console.log(err);
                                        cb(err);
                                    } else {
                                        instructor.courses.push(course._id);
                                        instructor.save((err, data) => {
                                            if (err) {
                                                console.log(err);
                                                cb(err);
                                            } else {
                                                console.log("update instructor's courses successful!");
                                                cb();
                                            }
                                        });
                                    }
                                });
                            }, (err) => {
                                if (err) {
                                    console.log(err);
                                    callback(null, 2);
                                }
                                callback(null, 2);
                            });
                        } else callback(null, 2);
                    }
                }, (err, results) => {
                    if (err) {
                        console.log(err);

                    }
                    console.log('Create successful!');
                    res.status(201).json({
                        status: true,
                        insertedCourse: course
                    });
                });


            }, (err) => {
                console.log(err);
                res.status(400).json({
                    status: false,
                    msg: "Cannot create!1"
                });
            })
        } else {
            res.status(400).json({
				status: false,
				msg: "Cannot create!"
			});
        }
    },

    edit: (req, res) => {
        if (req.body) {
            var updateCourse = new Course(req.body);
            Course.findOne({
                name: updateCourse.name
            }).then(
                (course) => {
                    if (course) {
                        Course.findByIdAndUpdate(course._id, {
                            $set: {
                                name: updateCourse.name,
                                title: updateCourse.title,
                                img: updateCourse.img,
                                description: updateCourse.description,
                                instructors: updateCourse.instructors,
                                created_by: updateCourse.created_by
                            }
                        }, (err, updatedCourse) => {
                            if (err) {
                                throw err;
                                res.status(400).json({
                                    status: false,
                                    msg: 'Update Failed!'
                                });
                            } else
                                res.status(200).json({
                                    status: true,
                                    msg: 'Update successful!'
                                });
                        });
                    } else {
                        res.status(400).json({
                            status: false,
                            msg: 'Update Failed!'
                        });
                    }
                },
                (err) => {
                    throw err;
                    res.status(400).json({
                        status: false,
                        msg: 'Update Failed!'
                    });
                }
            );
        } else {
            res.status(400).json({
                status: false,
                msg: 'Update Failed!'
            });
        }
    },

    getCourse: (req, res) => {
        if (req.params) {
            Course.findOne({
                    name: req.params.name
                }).select('-_id')
                .populate({
                    path: 'created_by',
                    select: "username"
                })
                .exec((err, course) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json({
                            status: false,
                            msg: "Not Found!"
                        });
                    }
                    res.json(course);
                });
        } else {
            res.status(400).json({
                status: false,
                msg: "Not Found!"
            });
        }

    },

    delete: (req, res) => {
        Course.findOne({
            name: req.params.name
        }).then(
            (course) => {
                Course.remove({
                    name: course.name
                }, (err) => {
                    if (err) {
                        throw err;
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
                    msg: 'cannot delete!'
                });
            }
        );
    },

    sida: (req, res) => {
        fs.readFile(__dirname + '/../../courses.json', (err, data) => {
            if (err) throw err;
            else {
                let dataJSON = JSON.parse(data);
                dataJSON["courses"].forEach((item, i) => {
                    var course = new Course(item);
                    course.save().then(
                        (doc) => {
                            console.log(doc);
                            res.status(200).json({
                                status: true,
                                msg: 'Insert successful!'
                            });
                        }, (err) => {
                            console.log(err);
                            res.status(400).json({
                                status: false,
                                msg: 'Insert Failed!'
                            });
                        }
                    );
                });
            }
        });
    }
}