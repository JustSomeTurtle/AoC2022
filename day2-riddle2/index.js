'use strict';
var EOL = require('os').EOL;
var fs = require('fs');

function run(input) {

    let totalScore = 0;
    var lines = input.split(EOL);
    for (const line of lines) {
        
        var moves = line.split(' ');
        var opponentChar = moves[0];
        var playerChar = moves[1];

        var opponentNum = toOpponentNum(opponentChar);
        var playerNum = toPlayerNum(playerChar);

        totalScore += calcScore(opponentNum, playerNum);
    }
    return totalScore;
}

function calcScore(opponent, player) {

    var scoreWin = 6;
    var scoreDraw = 3;
    var scoreLoss = 0;

    var winMap = {
        1: 2,
        2: 3,
        3: 1
    };

    var loseMap = {
        1: 3,
        2: 1,
        3: 2
    }

    // draw
    var score = player - opponent;
    if (player === 2) return opponent + scoreDraw;
    if (opponent < player || (opponent === player && player === 3)) return scoreWin + winMap[opponent];
    return scoreLoss + loseMap[opponent];
}

/**
 * Convert A to 1, B to 2, C to 3 based on ASCII.
 */
function toOpponentNum(char) {
    return char.charCodeAt(0) - 64;
}

/**
 * Convert X to 1, Y to 2, Z to 3 based on ASCII.
 */
function toPlayerNum(char) {
    return char.charCodeAt(0) - 87;
}

var input = fs.readFileSync('./assets/input-default.txt').toString();
var result = run(input);

console.log(result);

// 1 + 1 = 1 lose
// 1 + 2 = 5 draw
// 1 + 3 = 9 win
// 2 + 1 = 1 lose
// 2 + 2 = 5 draw
// 2 + 3 = 9 win
// 3 + 1 = 
// 3 + 2 = 2 lose
// 3 + 3 = 6 draw

// 1 + 1 = 4 draw 0
// 2 + 2 = 5 draw 0
// 3 + 3 = 6 draw 0

// 1 + 2 = 8 win 1 n
// 2 + 3 = 9 win 1 n
// 3 + 1 = 7 win -2 p

// 1 + 3 = 3 lose 2 p
// 2 + 1 = 1 lose -1 n
// 3 + 2 = 2 lose -1 n