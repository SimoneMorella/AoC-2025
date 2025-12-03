const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8');
const lines = data.split('\n');

function findSecretNumberAdvanced(lines) {
    let position = 50;
    let numberOfZeros = 0;
    for (const step of lines) {
        const [direction, ...turnsStr] = step;
        const turns = Number.parseInt(turnsStr.join(''), 10);
        const towards = (direction === 'L' ? -1 : 1) * turns;
        const end = position + towards;

        const raw = (end) % 100;
        const wrappedPos = raw < 0 ? raw + 100 : raw;

        const wraps = towards > 0
            ? Math.floor(end / 100) - Math.floor(position / 100)
            : Math.floor((position - 1) / 100) - Math.floor((end - 1) / 100);

        numberOfZeros += wraps;


        position = wrappedPos;
    }
    return numberOfZeros;
}

const result = findSecretNumberAdvanced(lines);
console.log(`The number of times we landed or passed on 0 is: ${result}`);

