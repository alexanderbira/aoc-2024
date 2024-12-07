import read from "../read.ts";

const input = await read(6);

const grid = input.split("\n").map(x => x.split(""));

let y = grid.findIndex(row => row.findIndex(cell => cell !== "." && cell !== "#") !== -1);
let x = grid[y].findIndex(cell => cell !== "." && cell !== "#");

const rotations = [[-1, 0], [0, 1], [1, 0], [0, -1]];
let direction = "^>v<".indexOf(grid[y][x]); //[dy, dx] in rotation

interface visitedInterface {
  [index: string]: number
}

// Bitmap of visited cells
// Each cell has 4 bits, one for each direction
// If the i-th bit is set, it means the cell was visited in the i-th direction
const visited: visitedInterface = {};
visited[`${y},${x}`] = 1 << direction;

let loops = 0;

// Returns true if a loop is found with the given starting point and direction
const tryCycle = (y: number, x: number, direction: number) => {
  const visited: visitedInterface = {};

  while (true) {
    // Try to move in the current direction
    const nextY = y + rotations[direction][0];
    const nextX = x + rotations[direction][1];

    // If there's an obstacle, rotate and retry moving
    if (grid?.[nextY]?.[nextX] === "#") {
      direction = (direction + 1) % 4;
      continue;
    }

    // If we exited the grid, break
    if (nextX < 0 || nextX >= grid[0].length || nextY < 0 || nextY >= grid.length) {
      return false;
    }

    // If we've already visited this cell in this direction, we've found a loop
    if (visited[`${nextY},${nextX}`] & (1 << direction)) {
      return true;
    }

    // Update the coords and the entry in the visited table
    y = nextY;
    x = nextX;

    const key = `${y},${x}`;
    if (!(key in visited)) visited[key] = 0;
    visited[key] |= 1 << direction;
  }
};


while (true) {
  // Try to move in the current direction
  const newY = y + rotations[direction][0];
  const newX = x + rotations[direction][1];
  const key = `${newY},${newX}`

  // If there's an obstacle, rotate and retry moving
  if (grid?.[newY]?.[newX] === "#") {
    direction = (direction + 1) % 4;
    continue;
  }

  // If we exited the grid, break
  if (newX < 0 || newX >= grid[0].length || newY < 0 || newY >= grid.length) {
    break;
  }

  // Try to find a loop
  grid[newY][newX] = "#" // Mark the cell as an obstacle
  if (!(key in visited) && tryCycle(y, x, direction)) {
    loops++
  }
  grid[newY][newX] = "." // Unmark the cell as an obstacle

  // Update the coords and the entry in the visited table
  y = newY;
  x = newX;

  if (!(key in visited)) visited[key] = 0;
  visited[key] |= 1 << direction;
}

console.log(Object.keys(visited).length);
console.log(loops);
