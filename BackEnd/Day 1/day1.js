let fs = require('fs');



fs.readFile('test.js',(err, data)=>{
  console.log(typeof(data.toString()));
});
fs.readFile('test.txt',(err, data)=>{
    console.log(data.toString());
});




// console.log(fs.readFileSync('test.js').toString());
// console.log(fs.readFileSync('test.txt').toString());
