const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8');

function parseInputInColumns(data) {
    const lines = data.split('\n');
    const grid = lines.map(line => line.split(' ').filter(item => item !== ''));
    const columns = [];

    for (let col = 0; col < grid[0].length; col++) {
        const columnData = [];
        for (const element of grid) {
            columnData.push(element[col]);
        }
        columns.push(columnData);
    }
    return columns;
}

function operateOnColumns(columns) {
    const results = [];
    for (const column of columns) {
        let result = 0;
        if (column[column.length - 1] === '+') {
            result = column.slice(0, -1).reduce((a, b) => Number.parseInt(a) + Number.parseInt(b), 0);
        } else if (column[column.length - 1] === '*') {
        result = column.slice(0, -1).reduce((a, b) => Number.parseInt(a) * Number.parseInt(b), 1);
        }
    results.push(result);
    }
    return results;
}




const columns = parseInputInColumns(data);
const results = operateOnColumns(columns);
console.log(results.reduce((a, b) => a + b, 0));