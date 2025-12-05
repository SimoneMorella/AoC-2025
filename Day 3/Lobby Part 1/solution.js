const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8');
const lines = data.split('\n');


function findLargestTwoDigitsNumbers(lines) {
    const twoDigitsNumbers = [];
    for (const bank of lines) {
        let firstBiggestNum = Math.max(...bank.split('').map(Number));
        if (bank.indexOf(firstBiggestNum.toString()) === bank.length - 1) {
            firstBiggestNum = Math.max(...bank.slice(0, -1).split('').map(Number));
        }
        let secondDigit = Math.max(...bank.slice(bank.indexOf(firstBiggestNum.toString()) + 1).split('').map(Number));
        const twoDigitNumber = Number.parseInt(firstBiggestNum.toString() + secondDigit.toString(), 10);
        twoDigitsNumbers.push(twoDigitNumber);
    }
    return twoDigitsNumbers;
}

const largestTwoDigitsNumbers = findLargestTwoDigitsNumbers(lines);
const sum = largestTwoDigitsNumbers.reduce((acc, num) => acc + num, 0);

console.log('The sum of the largest two-digit numbers from each bank is:', sum);