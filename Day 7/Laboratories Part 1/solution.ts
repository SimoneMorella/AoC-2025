import * as fs from "node:fs";

const data = fs.readFileSync('data.txt', 'utf8');
const grid = data.split('\n');

function countSplits(grid: string[]): number {
    let splits = 0;
    let activeCol = new Set<number>([grid[0].indexOf('S')]);
    const width = grid[0].length;

    for (let row = 1; row < grid.length; row++) {
        const newActiveCol = new Set<number>();

        for (const col of Array.from(activeCol)) {
            if (col < 0 || col >= width) continue;

            if (grid[row][col] === '^') {
                splits++;
                newActiveCol.add(col - 1);
                newActiveCol.add(col + 1);
            } else {
            newActiveCol.add(col);
            }
        }
        activeCol = newActiveCol;
        }
    return splits;
}

const result = countSplits(grid);
console.log(`Number of splits: ${result}`);