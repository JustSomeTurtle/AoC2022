var fs = require('fs');
var EOL = require('os').EOL;

let columnStrings = {};
let columnNr = 0;

let lines = fs.readFileSync('./assets/input-random.txt').toString().split(EOL);

function findColumnNr() {

    // store index of 1st "move" line
    let moveLnIndex = -1;

    // find first "move" line
    for (var ln of lines) {
        if (ln.startsWith('move')) {
            moveLnIndex = lines.indexOf(ln);
            break;
        }
    }

    // set numbering line index (two lines above "move" line)
    var numLnIndex = moveLnIndex - 2;

    // get last column number line
    var numLn = lines[numLnIndex];

    // get last number from line as total number of columns
    var columnNrs = numLn.trim().split('   ');
    columnNr = columnNrs[columnNrs.length - 1];

    // iterate through lines till numbering line index
    for (let i = 0; i < numLnIndex; i++) {

        // get crate line
        var crateLn = lines[i];
        
        // jump through crate letters exclusively
        for (let j = 1; j < (columnNr * 4); j=j+4) {

            // get current crate letter
            var crateLetter = crateLn[j];

            // if letter exists
            if (crateLetter.trim().length > 0) {

                // get crate column index
                var colIndex = (j - 1) / 4;

                // fill in column string array based on col index
                if (!columnStrings[colIndex]) {
                    columnStrings[colIndex] = crateLetter;
                } else {
                    columnStrings[colIndex] += crateLetter
                }
            }
        }
    }

    // iterate through all "move" lines
    for (let i = moveLnIndex; i < lines.length; i++) {

        var moveLn = lines[i];

        var rawDigits =
            moveLn
                .replace('move')
                .replace('from')
                .replace('to')
                .split(' ')
                .filter((ln) => ln !== 'undefined')
                .map((ln) => Number.parseInt(ln, 10));

        var moveAmount = rawDigits[0];
        var from = rawDigits[1];
        var to = rawDigits[2];

        var text = columnStrings[from - 1];
        var textFragment = text.substring(0, moveAmount);

        columnStrings[to - 1] = `${textFragment}${columnStrings[to - 1]}`;
        columnStrings[from - 1] = columnStrings[from - 1].substring(moveAmount);
    }

    let result = '';
    for (let i = 0; i < columnNr; i++) {
        result += columnStrings[i][0];
    }

    console.log(result);
}

columnNr = findColumnNr();
