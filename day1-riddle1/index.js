var fs = require('fs');
var EOL = require('os').EOL;

var inputFile = fs.readFileSync('input.txt').toString();

var lines = inputFile.split(EOL);

let max = 0;
let curr = 0;
for (const line of lines) {

    if (line.length === 0) {
        if (curr > max) {
            max = curr;
        }
        curr = 0;
    } else {
        curr += Number.parseInt(line, 10);
    }
}

console.log(max);