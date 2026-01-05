import * as fs from "fs";

const points: number[][] = fs
    .readFileSync("data.txt", "utf8")
    .trim()
    .split("\n")
    .map(line => line.split(",").map(Number));

const n = points.length;

const parent = Array.from({ length: n }, (_, i) => i);
const componentSize = Array(n).fill(1);

function findRoot(index: number): number {
    if (parent[index] !== index) {
        parent[index] = findRoot(parent[index]);
    }
    return parent[index];
}

function connectComponents(a: number, b: number): void {
    let rootA = findRoot(a);
    let rootB = findRoot(b);

    if (rootA === rootB) return;

    if (componentSize[rootA] < componentSize[rootB]) {
        [rootA, rootB] = [rootB, rootA];
    }

    parent[rootB] = rootA;
    componentSize[rootA] += componentSize[rootB];
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

function collectComponentSizes(): number[] {
    const sizes: number[] = [];

    for (let i = 0; i < n; i++) {
        if (findRoot(i) === i) {
            sizes.push(componentSize[i]);
        }
    }

    return sizes;
}

const distancePairs = buildDistancePairs();
distancePairs.sort((a, b) => a[0] - b[0]);

const connections = Math.min(1000, distancePairs.length);

for (let i = 0; i < connections; i++) {
    const [, a, b] = distancePairs[i];
    connectComponents(a, b);
}

const componentSizes = collectComponentSizes();
componentSizes.sort((a, b) => b - a);

while (componentSizes.length < 3) {
    componentSizes.push(1);
}

const result = componentSizes
    .slice(0, 3)
    .reduce((acc, size) => acc * size, 1);

console.log(result);
