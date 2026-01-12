import * as fs from "fs";

const points: number[][] = fs
    .readFileSync("data.txt", "utf8")
    .trim()
    .split("\n")
    .map(line => line.split(",").map(Number));


const n = points.length;

const parent = Array.from({ length: n }, (_, i) => i);
const componentSize = Array(n).fill(1);
let componentsCount = n;

function findRoot(index: number): number {
    if (parent[index] !== index) {
        parent[index] = findRoot(parent[index]);
    }
    return parent[index];
}

function connectComponents(a: number, b: number): boolean {
    let rootA = findRoot(a);
    let rootB = findRoot(b);

    if (rootA === rootB) return false;

    if (componentSize[rootA] < componentSize[rootB]) {
        [rootA, rootB] = [rootB, rootA];
    }

    parent[rootB] = rootA;
    componentSize[rootA] += componentSize[rootB];
    componentsCount--;

    return true;
}

type DistancePair = [number, number, number];

function buildDistancePairs(): DistancePair[] {
    const pairs: DistancePair[] = [];

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const [x1, y1, z1] = points[i];
            const [x2, y2, z2] = points[j];

            const distance = Math.hypot(
                x1 - x2,
                y1 - y2,
                z1 - z2
            );

            pairs.push([distance, i, j]);
        }
    }

    return pairs;
}

const distancePairs = buildDistancePairs();
distancePairs.sort((a, b) => a[0] - b[0]);

let result = 0;

for (const [, a, b] of distancePairs) {
    if (connectComponents(a, b) && componentsCount === 1) {
        result = points[a][0] * points[b][0];
        break;
    }
}

console.log(result);