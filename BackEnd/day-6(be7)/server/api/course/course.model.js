const mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique: true
    },
    title : String,
    img : String,
    description : String
});

module.exports = mongoose.model('Course', courseSchema);