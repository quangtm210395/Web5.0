const fs = require('fs');
const mongoose = require('../mongooseConnector');

var testSchema = new mongoose.Schema({
    testId: {
        type: Number,
        unique : true
    },
    content : String,
    sections: [{
        sectionId: Number,
        testId : Number,
        purpose : String,
        content : String,
        parts   : [{
            partId : Number,
            sectionId : Number,
            testId : Number,
            purpose : String,
            content : String,
            questions: [{
                type : {
                    type: String
                },
                content : String,
                answers : [{
                    value : String,
                    label : String
                }],
                correctAnswers: [],
                questionId : Number,
                part : Number,
                section : Number,
                test : Number
            }]
        }]
    }]
});

var Test = mongoose.model('Test', testSchema);

var _insertToDB = (req, res) =>{
    fs.readFile(__dirname + "/../../client/data.json", (err, data) => {
        if (err) throw err;
        else {
            let dataJSON = JSON.parse(data);
            var test = new Test(dataJSON);
            test.save().then((doc) => {
                console.log(doc);
                res.status(200).send('Insert successful!');
            }, (err) => {
                console.log(err);
                res.status(400).send('Insert Failed!');
            })
        }
    });
}

var _getTests = (req, res) => {
    var promise = Test.findOne({},
        {
            '__v' : 0
        }
    ).exec();
    promise.then((sections) => {
        res.json(sections);
    }, (err) => {
        console.log(err);
        res.status(400).send('No api!');
    })
}

var _answer = (req, res) => {
    let point = 0;
    let answerParts = req.body.sections[0].parts;
    var promise = Test.findOne({
        testId :1
    }).exec();
    promise.then((data) => {
        data.sections[0].parts.forEach((part, i) => {
            part.questions.forEach((question, idx) => {
                console.log(question.correctAnswers);
                console.log(answerParts[i].questions[idx].correctAnswers);
                let check = true;
                question.correctAnswers.forEach((answer, ansIdx) => {
                    if(answer != answerParts[i].questions[idx].correctAnswers[ansIdx]) {
                        check = false;
                    }
                })
                if (check == true){
                    point ++;
                    console.log(point);
                }
            });
        });
        res.json({
            result : point
        });
    }, (err) => {
        console.log(err);
        res.status(400).send('No api!');
    })
}

module.exports.insertToDB = _insertToDB;
module.exports.getTests = _getTests;
module.exports.answer = _answer;