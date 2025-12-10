const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8');
const [ranges, _] = data.split('\n\n').map(section => section.split('\n'));


function findAllNumbersIntoRanges(ranges) {
    const rangeObjects = ranges.map(range => {
        const [min, max] = range.split('-').map(Number);
        return { min, max };
    });
    const sortedRanges = rangeObjects.sort((a, b) => a.min - b.min);
    const mergedRanges = [];

    for (const range of sortedRanges) {
        if (mergedRanges.length === 0 || mergedRanges[mergedRanges.length - 1].max < range.min) {
            mergedRanges.push(range);
        } else {
            mergedRanges[mergedRanges.length - 1].max = Math.max(mergedRanges[mergedRanges.length - 1].max, range.max);
        }
    }

    let totalCount = 0;
    for (const range of mergedRanges) {
        totalCount += (range.max - range.min + 1);
    }

    return totalCount;

}

const totalNumbersIntoRange = findAllNumbersIntoRanges(ranges);
console.log('The total number of IDs within the ranges is:', totalNumbersIntoRange);