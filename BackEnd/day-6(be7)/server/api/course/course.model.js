const mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique: true
    },
    title : String,
    img : String,
    description : String,
    instructors: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Instructor'
    }],
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isDeleted : {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Course', courseSchema);