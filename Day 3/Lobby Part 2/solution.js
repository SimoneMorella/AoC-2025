const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8');
const lines = data.split('\n');

function findLargestTwelveDigitsNumbers(lines) {
    const twelveDigitsNumbers = [];
    for (const bank of lines) {
        let position = 0;
        const twelveDigitsArray = [];
        while (twelveDigitsArray.length < 12) {
            const remainingDigits = 12 - twelveDigitsArray.length;
            const limitDigitIndex = bank.length - remainingDigits;
            let highestDigit = -1;
            let highestDigitIndex = -1;
            for (let i = position; i <= limitDigitIndex; i++) {
                const currentDigit = Number.parseInt(bank[i], 10);
                if (currentDigit > highestDigit) {
                    highestDigit = currentDigit;
                    highestDigitIndex = i;
                    if (highestDigit === 9) {
                        break;
                    }
                }
            }
            twelveDigitsArray.push(highestDigit);
            position = highestDigitIndex + 1;
        }
        twelveDigitsNumbers.push(twelveDigitsArray.join(''));
    }
    return twelveDigitsNumbers.map(numStr => Number.parseInt(numStr, 10));
}
const largestTwelveDigitsNumbers = findLargestTwelveDigitsNumbers(lines);
const sum = largestTwelveDigitsNumbers.reduce((acc, num) => acc + num, 0);

console.log('The sum of the largest twelve digits numbers from each bank is:', sum);