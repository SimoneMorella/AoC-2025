import * as fs from "node:fs";

const data = fs.readFileSync('data.txt', 'utf8');

function divideInputInLines(data: string): string[][] {
    const lines = data.split('\n');
    const lineLength = lines[0].length;
    const splitLines: string[][] = [];

    for (let i = 0; i < lines.length; i++) {
        splitLines[i] = [];
    }

    for (let col = 0; col < lineLength; col++) {
        let isSpace = true;
        for (let row = 0; row < lines.length; row++) {
            if (lines[row][col] !== ' ') {
                isSpace = false;
                break;
            }
        }
        if (isSpace) {
            for (let row = 0; row < lines.length; row++) {
                splitLines[row].push('|');
            }
        } else {
            for (let row = 0; row < lines.length; row++) {
                splitLines[row].push(lines[row][col]);
            }
        }
    }

    const result = splitLines.map(lineArr => lineArr.join('')).map(line => line.split('|').filter(Boolean));
    return result;
}

function parseGridInColumns(result: string[][]): string[][] {
const columns: string[][] = [];
for (let col = 0; col < result[0].length; col++) {
    const columnData = [];
    for (const element of result) {
        columnData.push(element[col]);
    }
    columns.push(columnData);
}
return columns;
}
function transformColumnData(column: string[]): string[] {
    const transformedColumn = [];
    const maxLength = Math.max(...column.slice(0, -1).map(item => item.length));
    for (let i = 0; i < column.slice(0, -1).length; i++) {
        const item = column[i];
        const itemArr = item.split('');
        for (let j = column[i].length - 1; j >= 0; j--) {
            const digit = column[i][j];
            if (!transformedColumn[maxLength - itemArr.length + j]) {
                transformedColumn[maxLength - itemArr.length + j] = [];
            }
            transformedColumn[maxLength - itemArr.length + j].push(digit);
        }
    }

    transformedColumn.push([column[column.length - 1]]);
    return transformedColumn.map(arr => arr.join(''));
    }

function operateOnColumnsByDigits(columns: string[][]) {

    const results = [];
    for (const column of columns) {
        let result = 0;
        if (column[column.length - 1].trim() === '+') {
            result = column.slice(0, -1).map(Number).reduce((a, b) => a + b, 0);
        } else if (column[column.length - 1].trim() === '*') {
            result = column.slice(0, -1).map(Number).reduce((a, b) => a * b, 1);
        }
        results.push(result);
    }
    return results;
}



const result = divideInputInLines(data);
const columns = parseGridInColumns(result);
const transformedColumns = columns.map(column => transformColumnData(column));

console.log(columns[2]);
console.log(transformedColumns[2]);
const results = operateOnColumnsByDigits(transformedColumns);
console.log(results.reduce((a, b) => a + b, 0));