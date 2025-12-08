const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8');
const lines = data.split('\n');

function findNumberOfPaperRolls(lines) {
    let totalRolls = 0;
    let lineChanged = true;
    while (lineChanged) {
        lineChanged = false;
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            for (let j = 0; j < line.length; j++) {
                const isAPaperRoll = line[j] === '@';
                if (isAPaperRoll && checkAdjacentCells(lines, i, j)) {
                    totalRolls += 1;
                    line = line.slice(0, j) + 'x' + line.slice(j + 1);
                    lines[i] = line;
                    lineChanged = true;
                    break;
                }
            }
        }
    }
    return totalRolls;
}

function checkAdjacentCells(lines, row, col) {
    const directions = [
        [-1, 0], // up
        [-1, -1], // up-left
        [-1, 1],  // up-right
        [1, 0],  // down
        [1, -1], // down-left
        [1, 1],  // down-right
        [0, -1], // left
        [0, 1]   // right
    ];
    let numberOfObstacles = 0;
    for (const [dRow, dCol] of directions) {
        const newRow = row + dRow;
        const newCol = col + dCol;
        if (newRow >= 0 && newRow < lines.length && newCol >= 0 && newCol < lines[newRow].length) {
            if (lines[newRow][newCol] === '@') {
                numberOfObstacles += 1;
            }
        }
    }
    return numberOfObstacles < 4;
}

const totalPaperRolls = findNumberOfPaperRolls(lines);
console.log('The total number of paper rolls needed is:', totalPaperRolls);