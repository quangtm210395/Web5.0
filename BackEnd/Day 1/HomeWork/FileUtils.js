let fs = require('fs');
let readLine = require('readline');

//
let readfile = function(file, callback) {
    let arr = [];
    let lineReader = readLine.createInterface({
        input: fs.createReadStream(file)
    });
    lineReader.on('line', (line) => {
        // console.log(line.charAt(0));
        arr.push({
            key: line.charAt(0),
            value: parseInt(line.substring(2, line.length))
        });
    });//after this line, arr empty, I don't know why
    if (callback !== undefined) callback(arr);
}

let readFile = function(file, callback) {
    fs.readFile(file, (err, data) => {
        let arr = [];
        let lines = data.toString().split("\n");
        lines.forEach((line) => {
          if ( /^[a-zA-Z()]+$/.test(line.charAt(0))){
            arr.push({
              key: line.charAt(0),
              value: parseInt(line.substring(2, line.length))
            });
          }

        });
        if (callback !== undefined) callback(err, arr);
    });
}

let writeFile = function(file, dataToWrite, callback) {
    fs.appendFile(file, dataToWrite, (err) => {
        if (callback !== undefined) callback(err);
    })
}

module.exports.readFile = readFile;
module.exports.readfile = readfile;
module.exports.writeFile = writeFile;
