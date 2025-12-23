import * as fs from "node:fs";

const data = fs.readFileSync('data.txt', 'utf8');
const grid = data.split('\n');


function countTimelines(grid: string[]): number {
    let activePaths = new Map<number, number>([
        [grid[0].indexOf("S"), 1],
    ]);
    const width = grid[0].length;

    for (let row = 1; row < grid.length; row++) {
        const nextPaths = new Map<number, number>();

        for (const [col, count] of Array.from(activePaths.entries())) {
            if (col < 0 || col >= width) continue;

            if (grid[row][col] === '^') {
                nextPaths.set(col - 1, (nextPaths.get(col - 1) ?? 0) + count);
                nextPaths.set(col + 1, (nextPaths.get(col + 1) ?? 0) + count);
            } else {
                nextPaths.set(col, (nextPaths.get(col) ?? 0) + count);
            }
        }
        activePaths = nextPaths;
    }
    return Array.from(activePaths.values()).reduce((a, b) => a + b, 0);
}

const result = countTimelines(grid);
console.log(`Number of timelines splits: ${result}`);