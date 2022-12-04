var fs = require('fs');
var EOL = require('os').EOL;

var inputFile = fs.readFileSync('input.txt').toString();

var lines = inputFile.split(EOL);

let max = [];
let curr = 0;
for (const line of lines) {

    if (line.length === 0) {
        max.push(curr);
        if (max.length > 3) {
            let min = Math.min(...max);
            let index = max.indexOf(min);
            if (index > -1) {
                max.splice(index, 1);
            }
        }
        curr = 0;
    } else {
        curr += Number.parseInt(line, 10);
    }
}

var sumOfAllMaxes = max.reduce((prev, curr) => prev + curr);
console.log(sumOfAllMaxes);