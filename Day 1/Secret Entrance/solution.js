const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8');
const lines = data.split('\n');

function findSecretNumber(lines) {
    let position = 50;
    let numberOfZeros = 0;
    for (const step of lines) {
        const [direction, ...turnsStr] = step;
        const turns = Number.parseInt(turnsStr.join(''), 10);
        const towards = direction === 'L' ? -turns : +turns;
        const modulePos = (position + towards + 10000) % 100;

        if (modulePos === 0) numberOfZeros++;

        position = modulePos;
    }
    return numberOfZeros;
}

const result = findSecretNumber(lines);
console.log(`The number of times we landed on 0 is: ${result}`);