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
            if (isMadeOfDuplicateSequences(id)) {
                invalidIds.push(id);
            }
        }
    }
    return invalidIds;
}

// instead of checking based on the divider, check based on the sequence length and constructed ids
// if the constructed id matches the original id, then it's made of duplicate sequences
// check for all possible sequence lengths, then construct an id based on that sequence and the max number of sequences then compare
function isMadeOfDuplicateSequences(id) {
    const idStr = id.toString();
    const length = idStr.length;

    for (let seqLength = 1; seqLength <= Math.floor(length / 2); seqLength++) {
        if (length % seqLength === 0) {
            const sequence = idStr.slice(0, seqLength);
            let constructed = '';
            for (let i = 0; i < length / seqLength; i++) {
                constructed += sequence;
            }
            if (constructed === idStr) {
                return true;
            }
        }
    }
    return false;
    // code but with divider logic commented out (wanted to try if it worked fine)
    // const idStr = id.toString();
    // const length = idStr.length;
    // let divider = 1;
    //
    // while (divider <= length / 2) {
    //     if (length % divider === 0) {
    //         const sequence = idStr.slice(0, divider);
    //         for (let i = divider; i < length; i += divider) {
    //             const nextSequence = idStr.slice(i, i + divider);
    //             if (sequence !== nextSequence) {
    //                 break;
    //             }
    //             if (i + divider === length) {
    //                 return true;
    //             }
    //         }
    //         divider++;
    //     }
    //     else {
    //         divider++;
    //     }
    // }
    // return false;
}

const invalidIds = findInvalidIds(ranges);
console.log('The invalid gift shop IDs sum is:', invalidIds.reduce((a, b) => a + b, 0));
