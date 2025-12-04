const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8');
const ranges = data.split(',');

function findInvalidIds(ranges) {
    const invalidIds = [];

    for (const range of ranges) {
        const [startStr, endStr] = range.split('-');
        const start = Number.parseInt(startStr, 10);
        const end = Number.parseInt(endStr, 10);
        for (let id = start; id <= end; id++) {
            if (isMadeOfADuplicateSequence(id)) {
                invalidIds.push(id);
            }
        }
    }
    return invalidIds;
}

function isMadeOfADuplicateSequence(id) {
    const idStr = id.toString();
    const length = idStr.length;
    return idStr.slice(0, length / 2) === idStr.slice(length / 2);

}

const invalidIds = findInvalidIds(ranges);
console.log('The invalid gift shop IDs sum is:', invalidIds.reduce((a, b) => a + b, 0));
