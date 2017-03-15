const fs = require('fs');

var Course = require('./course.model');


module.exports = {
    getAll: (req, res) => {
        var promise = Course.find({}, {
            '__v': 0
        });
        promise.then((courses) => {
            res.json(courses);
        }, (err) => {
            console.log(err);
            res.status(400).send('No course!');
        })
    },

    create: (req, res) => {
        var course = new Course(req.body);
        var promise = course.save();
        promise.then((doc) => {
            console.log('Create successful!');
            res.status(201).json(doc);
        }, (err) => {
            console.log(err);
            res.status(400).send(err);
        })
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
                                description: updateCourse.description
                            }
                        }, (err, updatedCourse) => {
                            if (err) {
                                throw err;
                                res.status(400).send('Update Failed!');
                            } else
                                res.status(200).send('Update successful!');
                        });
                    } else {
                        res.status(400).send("Update Failed!");
                    }
                },
                (err) => {
                    throw err;
                    res.status(400).send("Update Failed!");
                }
            );
        } else {
            res.status(400).send("Update failed!");
        }
    },

    getCourse: (req, res) => {
        Course.findOne({
            name: req.params.name
        }).then(
            (course) => {
                res.status(200).json(course);
            }, (err) => {
                throw err;
                res.status(400).send('Cannot get course name: ' + req.params.name);
            }
        );
    },

    delete: (req, res) => {
        Course.findOne({name: req.params.name})
            .then(
                (course) => {
                    Course.remove({name: course.name}, (err) => {
                        if(err) {
                            throw err;
                            res.status(400).send('cannot delete!');
                        } else {
                            res.status(200).send('Delete successful!');
                        }
                    });
                }, (err) => {

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