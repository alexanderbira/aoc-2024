// I really thought part 2 would be finding the shortest path where a new byte
// falls after each step.
import read from "../read.ts";
import { MinPriorityQueue } from "@datastructures-js/priority-queue";

type gridType = ("." | "#")[][];

const input = await read(18);

const coords = input.split("\n").map((xy) => xy.split(",").map(Number));

const maxY = 70;
const maxX = 70;

const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

const getGrid = (fallenBytes: number): gridType => {
  const grid = new Array(maxY + 1).fill(null).map((_) => {
    return new Array(maxX + 1).fill(".");
  });

  for (let i = 0; i < fallenBytes; i++) {
    const [x, y] = coords[i];
    grid[y][x] = "#";
  }

  return grid;
}

const h = (y: number, x: number) => maxY - y + maxX - x;

const findExit = (grid: gridType) => {
  const queue = new MinPriorityQueue<[number, number, number]>((
    [y, x, steps],
  ) => h(y, x) + steps);
  queue.enqueue([0, 0, 0]);

  const visited = new Set<string>();

  while (!queue.isEmpty()) {
    const [y, x, steps] = queue.dequeue();

    const key = `${y},${x}`;
    if (visited.has(key)) continue;
    visited.add(key);

    if (y === maxY && x === maxX) {
      return steps;
    }

    for (const [dy, dx] of directions) {
      const newY = y + dy;
      const newX = x + dx;

      if (
        newY >= 0 && newY <= maxY && newX >= 0 && newX <= maxX &&
        grid[newY][newX] !== "#"
      ) {
        queue.enqueue([newY, newX, steps + 1]);
      }
    }
  }

  return -1;
}

console.log(findExit(getGrid(1024)));

let left = 1024;
let right = coords.length;

while (left < right) {
  const mid = Math.floor((left + right) / 2);

  if (findExit(getGrid(mid)) === -1) {
    right = mid;
  } else {
    left = mid + 1;
  }
}

console.log(coords[left - 1].join());
