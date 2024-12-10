import read from "../read.ts";

const input = await read(10);

const grid = input.split("\n").map((row) => row.split("").map(Number));
const height = grid.length;
const width = grid[0].length;

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

const trailsFrom = (
  y: number,
  x: number,
  visited: Set<string>,
  rating: boolean,
) => {
  if (!rating) {
    const key = `${y},${x}`;
    if (visited.has(key)) return 0;
    visited.add(key);
  }
  if (grid[y][x] === 9) return 1;

  let numPaths = 0;

  for (const [dy, dx] of directions) {
    const newY = y + dy;
    const newX = x + dx;

    if (newY >= height || newY < 0 || newX >= width || newX < 0) continue;

    if (grid[newY][newX] === grid[y][x] + 1) {
      numPaths += trailsFrom(newY, newX, visited, rating);
    }
  }

  return numPaths;
};

let scores = 0;
let ratings = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (grid[y][x] === 0) {
      scores += trailsFrom(y, x, new Set(), false);
      ratings += trailsFrom(y, x, new Set(), true);
    }
  }
}

console.log(scores);
console.log(ratings);
