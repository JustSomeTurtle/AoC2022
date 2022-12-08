var fs = require('fs');

var input = fs.readFileSync('./assets/input-random.txt').toString();

function detectStartOfPacket(input, packetLength) {
    var bufferedLetters = [];
    for (let i = 0; i < input.length; i++) {
        
        var letter = input[i];

        bufferedLetters.push(letter);
        
        if (bufferedLetters.length > packetLength) {

            bufferedLetters.shift();

            if (bufferedLetters.filter((v, i, a) => a.indexOf(v) === i).length === packetLength) {
                return i + 1;
            }
        }
    }
}

var result = detectStartOfPacket(input, 4);

console.log(result);
