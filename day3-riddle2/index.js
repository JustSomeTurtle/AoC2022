'use strict';
var fs = require('fs');
var EOL = require('os').EOL;

const input = fs.readFileSync('./assets/input-random.txt').toString();

function run(input) {

    var lines = input.split(EOL);

    let score = 0;
    let items = [];

    var groups = 3;

    for (let l = 0; l < lines.length; l++) {
        var line = lines[l];
        
        var group = l % groups;

        if (!items[group]) {
            items[group] = [];
        }

        for (let i = 0; i < line.length; i++) {
            
            var char = line[i];

            if (items[group].indexOf(char) === -1) {
                items[group].push(char);
            }
        }

        if (group === groups - 1 && l + 1 !== lines.length) {

            for (let i = 0; i < items[0].length; i++) {

                var char = items[0][i];

                if (items[1].indexOf(char) > -1 && items[2].indexOf(char) > -1) {
                    score += toPrio(char);
                    break;
                }

            }

            items = [];
        }

    }

    for (let i = 0; i < items[0].length; i++) {

        var char = items[0][i];

        if (items[1].indexOf(char) > -1 && items[2].indexOf(char) > -1) {
            score += toPrio(char);
            break;
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