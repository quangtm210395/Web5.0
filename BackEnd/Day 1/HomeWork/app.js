let fu = require('./FileUtils');
let fs = require('fs');


let containsKey = function(arr, key) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].key == key) return i;
    }
    return -1;
}

let formatData = function(data) {
    let obj = [];
    for (let i = 0; i < data.length; i++) {
        let indexKey = containsKey(obj, data[i].key);
        if (indexKey == -1) {
            obj.push(data[i]);
        } else {
            obj[indexKey].value += data[i].value;
        }
    }
    return obj;
}

let arrToString = function(arr) {
    let str = "";
    for (let i = 0; i < arr.length; i++) {
        str += arr[i].key + " " + arr[i].value + "\r\n";
    }
    return str;
}

let argv = process.argv.splice(2);
let inputFile = argv[0];
let outputFile = argv[1];

fu.readFile(inputFile, (err, data) => {
    if (err) throw err;
    let dataToWrite = arrToString(formatData(data));
    fu.writeFile(outputFile, dataToWrite, (err) => {
      if (err) throw err;
      else console.log("write from " + inputFile + " to " + outputFile + " success!");
    });
});
