const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/web5');

var Cat = mongoose.model('Cat', {name: String});

var cat1 = new Cat({name : "Garfireld"});

cat1.save().then( (doc) => {
    console.log(doc);
}, (err)=> {
    console.log(err);
} );