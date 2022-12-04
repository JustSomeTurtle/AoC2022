'use strict';
var fs = require('fs');
var EOL = require('os').EOL;

const input = fs.readFileSync('./assets/input-random.txt').toString();

function run(input) {

    var lines = input.split(EOL);

    let score = 0;
    for (const line of lines) {
        
        var items = [];
        for (let i = 0; i < line.length / 2; i++) {
            
            var char = line[i];
            
            if (items.indexOf(char) === -1) {
                items.push(char);
            }
        }

        for (let i = line.length / 2; i < line.length; i++) {
            
            var char = line[i];
            
            if (items.indexOf(char) > -1) {
                score += toPrio(char);
                break;
            }
            
        }

    }

    return score;
}

function toPrio(char) {
    var ascii = char.charCodeAt(0);

    // a-z
    if (ascii > 96 && ascii < 123) {
        return ascii - 96;
    }

    // A-Z
    if (ascii > 64 && ascii < 91) {
        return ascii - 64 + 26;
    }

    throw new Error();
}

var result = run(input);

console.log(result);