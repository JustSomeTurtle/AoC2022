'use strict';
var fs = require('fs');
var EOL = require('os').EOL;

var input = fs.readFileSync('./assets/input-random.txt').toString();

function run(input) {

    var lines = input.split(EOL);

    let occurences = 0;


    for (const line of lines) {
        
        var splittedRanges = line.split(',');

        var splittedRangeA = splittedRanges[0].split('-');
        var splittedRangeB = splittedRanges[1].split('-');

        var rangeAMin = Number.parseInt(splittedRangeA[0], 10);
        var rangeAMax = Number.parseInt(splittedRangeA[1], 10);

        var rangeBMin = Number.parseInt(splittedRangeB[0]);
        var rangeBMax = Number.parseInt(splittedRangeB[1]);

        if (
            rangeAMax >= rangeBMin && rangeBMax >= rangeAMin
        ) {
            occurences++;   
        }
    }

    return occurences;
}

var result = run(input);

console.log(result);
