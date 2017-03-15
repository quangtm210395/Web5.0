'use strict';

const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique: true,
        required: true
    },
    password : String,
    name : String,
    age : Number,
    role : {
        type: String,
        default: 'user'
    }
});

module.exports = mongoose.model('User', userSchema);