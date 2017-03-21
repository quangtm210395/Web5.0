const mongoose = require('mongoose');

var instructor = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique: true
    },
    age : Number,
    img : String,
    description : String,
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    isDeleted : {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Instructor', instructor);