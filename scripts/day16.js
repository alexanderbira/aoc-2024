import read from "../read.ts";
import {MinPriorityQueue} from '@datastructures-js/priority-queue';

const input = await read(16);

const grid = input.split("\n").map(row => row.split(""));

const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

const queue = new MinPriorityQueue((v) => v[3]);
queue.enqueue([grid.length - 2, 1, 0, 0, [`${grid.length - 2},1`]]);

const visited = new Set();
const bestSpots = new Set();

let shortest = Infinity;

while (!queue.isEmpty()) {
  const [y, x, dir, cost, path] = queue.dequeue();

  // Reached the end
  if (grid[y][x] === "E") {
    if (cost <= shortest) {
      shortest = cost;
      path.forEach(c => bestSpots.add(c));
      continue;
    }
    break;
  }

  visited.add(`${y},${x},${dir}`);

  // Go in direction
  const [dy, dx] = directions[dir];
  const newY = y + dy;
  const newX = x + dx;
  if (!visited.has(`${newY},${newX},${dir}`) && grid[y][x] !== "#") {
    queue.enqueue([newY, newX, dir, cost + 1, [...path, `${newY},${newX}`]]);
  }

  // Change direction
  for (const ddir of [-1, 1]) {
    const newDir = ((dir + ddir) + 4) % 4;
    if (!visited.has(`${y},${x},${newDir}`)) {
      queue.enqueue([y, x, newDir, cost + 1000, path]);
    }
  }
}

console.log(shortest);
console.log(bestSpots.size);
