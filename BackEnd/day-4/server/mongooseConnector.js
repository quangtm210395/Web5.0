const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/web5');

module.exports = mongoose;