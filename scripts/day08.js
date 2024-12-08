import read from "../read.ts";

const input = await read(8);

const grid = input.split("\n").map(row => row.split(""));
const height = grid.length;
const width = grid[0].length;

// {frequency: [y, x]}
const positions = {};

// Find all the antennas
for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const curr = grid[y][x];
    if (curr === ".") continue
    if (!(curr in positions)) {
      positions[curr] = [];
    }
    positions[curr].push([y, x]);
  }
}

const antinodes1 = new Set();
const antinodes2 = new Set();

const pointInBounds = ([y, x]) => y < height && x < width && y >= 0 && x >= 0;

// For every set of antenna points
for (const points of Object.values(positions)) {
  // For every unique pair of antennas
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [y1, x1] = points[i];
      const [y2, x2] = points[j];
      const dy = y1 - y2;
      const dx = x1 - x2;

      let candidate = [y1, x1];
      while (true) {
        if (pointInBounds(candidate)) {
          antinodes2.add(candidate.join());
        } else {
          break;
        }
        candidate[0] += dy;
        candidate[1] += dx;
      }

      candidate = [y2, x2]
      while (true) {
        if (pointInBounds(candidate)) {
          antinodes2.add(candidate.join());
        } else {
          break;
        }
        candidate[0] -= dy;
        candidate[1] -= dx;
      }

      const candidate1 = [y1 + dy, x1 + dx];
      if (pointInBounds(candidate1)) {
        antinodes1.add(candidate1.join());
      }

      let candidate2 = [y2 - dy, x2 - dx];
      if (pointInBounds(candidate2)) {
        antinodes1.add(candidate2.join());
      }
    }
  }
}

console.log(antinodes1.size);
console.log(antinodes2.size);
