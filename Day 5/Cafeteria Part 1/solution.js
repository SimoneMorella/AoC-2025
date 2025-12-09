const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8');
const [ranges, ids] = data.split('\n\n').map(section => section.split('\n'));

function findIdsIntoRanges(ranges, ids) {
    const rangeObjects = ranges.map(range => {
        const [min, max] = range.split('-').map(Number);
        return { min, max };
    });

    let count = 0;
    for (const id of ids) {
        const numericId = Number(id);
        for (const range of rangeObjects) {
            if (numericId >= range.min && numericId <= range.max) {
                count += 1;
                break;
            }
        }
    }
    return count;
}

const totalIdsInRanges = findIdsIntoRanges(ranges, ids);
console.log('The total number of IDs within the specified ranges is:', totalIdsInRanges);