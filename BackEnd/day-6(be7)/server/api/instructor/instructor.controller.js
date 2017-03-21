const fs = require('fs');
const async = require('async');

var Course = require('../course/course.model');
var User = require('../user/user.model');
var Instructor = require('./instructor.model')

module.exports = {
	getAll: (req, res) => {
		Instructor.find().sort('name')
			.populate({
				path: 'created_by',
				select: 'username'
			})
			.populate({
				path: 'courses',
				select: 'name'
			})
			.exec((err, data) => {
				if (err) {
					console.log(err);
					res.status(400).json({
						status: false,
						msg: 'Not found!'
					});
				}
				res.status(200).json(data);
			});
	},

	create: (req, res) => {
		if (req.body) {
			var instructor = new Instructor(req.body);
			instructor.save((err, instructor) => {
				if (err) {
					console.log(err);
					res.status(400).json({
						status: false,
						msg: 'Create failed!'
					});
				} else {
					async.parallel({
						one: (callback) => {
							if (instructor.created_by) {
								User.findById(instructor.created_by, (err, user) => {
									if (err) {
										console.log(err);
										callback(null, 1);
									} else {
										user.created_instructor.push(instructor._id);
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
							if (instructor.courses) {
								async.each(instructor.courses, (courseId, cb) => {
									Course.findById(courseId, (err, course) => {
										if (err) {
											console.log(err);
											cb(err);
										} else {
											course.instructors.push(instructor._id);
											course.save((err, data) => {
												if (err) {
													console.log(err);
													cb(err);
												} else {
													console.log("update course's instructors successful!");
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
							} else {
								callback(null, 2);
							}
						}
					}, (err, results) => {
						if (err) {
							console.log(err);

						}
						console.log('create successful!');
						res.status(201).json({
							status: true,
							insertedInstrutor: instructor
						});
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

	getByName: (req, res) => {
		if (req.params.name) {
			Instructor.findOne({
					name: req.params.name
				})
				.populate({
					path: 'created_by',
					select: 'username'
				})
				.populate({
					path: 'courses',
					select: 'name'
				})
				.exec((err, instructor) => {
					if (err) {
						console.log(err);
						res.status(400).json({
							status: false,
							msg: 'Not found!'
						});
					}
					res.status(200).json(instructor);
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
			Instructor.findOne({
					name: req.body.name
				})
				.exec((err, instructor) => {
					if (err) {
						console.log(err);
						res.status(400).json({
							status: false,
							msg: 'Instructor not found!'
						});
					} else {
						instructor.name = req.body.name;
						instructor.age = req.body.age;
						instructor.img = req.body.img;
						instructor.description = req.body.description;
						instructor.created_by = req.body.created_by;
						instructor.courses = req.body.courses;
						instructor.save((err, updatedInstr) => {
							if (err) {
								res.status(400).json({
									status: false,
									msg: 'Update Failed!'
								});
							} else {
								res.status(200).json({
									status: true,
									msg: "Edit successful!",
									updatedInstructor: updatedInstr
								});
							}
						})
					}
				})
		} else {
			res.status(400).json({
				status: false,
				msg: 'Please input data to update'
			});
		}
	},

	delete: (req, res) => {
		if (req.params.name) {
			Instructor.findOne({
					name: req.params.name
				})
				.exec((err, instructor) => {
					if (err) {
						console.log(err);
						res.status(400).json({
							status: false,
							msg: 'Cannot delete!'
						});
					} else {
						Instructor.remove({
							name: instructor.name
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
					}
				});
		} else {
			res.status(400).json({
				status: false,
				msg: "Not Found to delete!"
			});
		}
	},

	sida: (req, res) => {
		fs.readFile(__dirname + '/../../instructor.json', (err, data) => {
			if (err) throw err;
			else {
				let dataJSON = JSON.parse(data);
				dataJSON["instructors"].forEach((item, i) => {
					var instructor = new Instructor(item);
					instructor.save().then(
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