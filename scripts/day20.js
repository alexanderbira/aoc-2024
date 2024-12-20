import read from "../read.ts";

const input = await read(20);

const grid = input.split("\n").map(row => row.split(""));

const startY = grid.findIndex(row => row.includes("S"));
const startX = grid[startY].findIndex(cell => cell === "S");

const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

const maxY = grid.length - 1;
const maxX = grid[0].length - 1;

const shortestDistance = {};

// Can't find a decent deque library for Deno 🙁
const toProcess = [[startY, startX, 0]];

while (toProcess.length) {
  const [y, x, steps] = toProcess.shift();

  shortestDistance[`${y},${x}`] = steps;

  for (const [dy, dx] of directions) {
    const newY = y + dy;
    const newX = x + dx;

    if (
      newY >= 0 && newY <= maxY && newX >= 0 && newX <= maxX &&
      grid[newY][newX] !== "#" && (!(`${newY},${newX}` in shortestDistance))
    ) {
      toProcess.push([newY, newX, steps + 1]);
    }
  }
}

const withCheatLength = (cheatLength) => {
  // The [dy, dx] pairs with Manhattan distance of up to cheatLength from the
  // origin
  const cheatDestinations = [];
  for (let dy = -cheatLength; dy <= cheatLength; dy++) {
    for (let dx = -cheatLength; dx <= cheatLength; dx++) {
      if (Math.abs(dy) + Math.abs(dx) <= cheatLength) {
        cheatDestinations.push([dy, dx]);
      }
    }
  }

  let num100Saves = 0;

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      if (grid[y][x] !== "#") {

        for (const [dy, dx] of cheatDestinations) {
          const newY = y + dy;
          const newX = x + dx;

          if (
            // Is the cheat cell valid?
            newY >= 0 && newY <= maxY && newX >= 0 && newX <= maxX &&
            grid[newY][newX] !== "#" &&

            // Is the cheat cell further than the current cell from the start?
            shortestDistance[`${newY},${newX}`] > shortestDistance[`${y},${x}`] &&

            // Did the cheat save us 100+ moves?
            shortestDistance[`${newY},${newX}`] - shortestDistance[`${y},${x}`] -
            (Math.abs(y - newY) + Math.abs(x - newX)) >= 100
          ) num100Saves++;
        }
      }
    }
  }

  return num100Saves;
}

console.log(withCheatLength(2));
console.log(withCheatLength(20));
