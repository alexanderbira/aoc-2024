import read from "../read.ts";

type moveType = "^" | ">" | "v" | "<";
type grid1Cell = "#" | "." | "O" | "@";

const input = await read(15);

const [a_, b_] = input.split("\n\n");

const gridReplacements = { "#": "##", "O": "[]", ".": "..", "@": "@." };
const grid = a_.split("\n").map((row) => row.split("")) as grid1Cell[][];
let grid2 = grid.map((row) =>
  row.map((el) => gridReplacements[el]).join("").split("")
);

const directions = { "^": [-1, 0], "v": [1, 0], "<": [0, -1], ">": [0, 1] };
const moves = b_.split("\n").join("").split("") as moveType[];

const startY = grid.findIndex((row) => row.includes("@"));
const startX = grid[startY].findIndex((x) => x === "@");
const startY2 = grid2.findIndex((row) => row.includes("@"));
const startX2 = grid2[startY2].findIndex((x) => x === "@");

const curPosition = [startY, startX];

const gpsCoordSum = (grid: string[][], char: string) => {
  let sum = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === char) sum += 100 * y + x;
    }
  }
  return sum;
};

// --- Part 1 ---

// Get the first "." moving in the (dy,dx) direction from (y,x)
const firstGapBeforeWall = (
  y: number,
  x: number,
  dy: number,
  dx: number,
): [number, number, boolean] | null => {
  let currY = y;
  let currX = x;
  let objectEncountered = false;

  while (true) {
    currY += dy;
    currX += dx;

    switch (grid[currY][currX]) {
      case ".":
        return [currY, currX, objectEncountered];
      case "O":
        objectEncountered = true;
        break;
      case "#":
        return null;
    }
  }
};

for (const move of moves) {
  const [dy, dx] = directions[move];

  const firstGap = firstGapBeforeWall(curPosition[0], curPosition[1], dy, dx);

  if (firstGap === null) continue;

  const [y, x, objectEncountered] = firstGap;

  if (objectEncountered) {
    grid[y][x] = "O";
  }
  grid[curPosition[0]][curPosition[1]] = ".";
  grid[curPosition[0] + dy][curPosition[1] + dx] = "@";

  curPosition[0] += dy;
  curPosition[1] += dx;
}

console.log(gpsCoordSum(grid, "O"));

// --- Part 2 ---

curPosition[0] = startY2;
curPosition[1] = startX2;

/*
Given a grid, an item in the grid (y,x), and a direction (dy,dx):
- Recursively check whether we're able to push the item in the direction (return value)
- Then move the item in that direction
*/
const performPush = (
  grid: string[][],
  y: number,
  x: number,
  dy: number,
  dx: number,
  called: Set<string>,
  notCalled: number[][],
): boolean => {
  const toPushY = y + dy;
  const toPushX = x + dx;

  const key = `${toPushY},${toPushX}`;
  if (called.has(key)) return true;
  called.add(key);

  let success = true;

  switch (grid[toPushY][toPushX]) {
    case "#":
      success = false;
      break;

    case ".":
      grid[toPushY][toPushX] = grid[y][x];
      success = true;
      break;

    case "[":
      success &&= performPush(
        grid,
        toPushY,
        toPushX,
        dy,
        dx,
        called,
        notCalled,
      );
      success &&= performPush(
        grid,
        toPushY,
        toPushX + 1,
        dy,
        dx,
        called,
        notCalled,
      );
      notCalled.push([toPushY, toPushX + 1]);
      grid[toPushY][toPushX] = grid[y][x];
      break;

    case "]":
      success &&= performPush(
        grid,
        toPushY,
        toPushX,
        dy,
        dx,
        called,
        notCalled,
      );
      success &&= performPush(
        grid,
        toPushY,
        toPushX - 1,
        dy,
        dx,
        called,
        notCalled,
      );
      notCalled.push([toPushY, toPushX - 1]);
      grid[toPushY][toPushX] = grid[y][x];
      break;
  }

  return success;
};

for (const move of moves) {
  const [dy, dx] = directions[move];

  // I'm aware that structuredClone makes this implementation extremely slow,
  // but it's 6:42am and I can't be bothered to change it.
  const newGrid = structuredClone(grid2);
  const called = new Set<string>();
  // notCalled keeps track of all the secondary box components, which might need
  // to be replaced with "." after moving
  const notCalled = [[curPosition[0], curPosition[1]]];

  if (
    performPush(
      newGrid,
      curPosition[0],
      curPosition[1],
      dy,
      dx,
      called,
      notCalled,
    )
  ) {
    grid2 = newGrid;

    for (const [y, x] of notCalled) {
      if (!called.has(`${y},${x}`)) {
        grid2[y][x] = ".";
      }
    }

    curPosition[0] += dy;
    curPosition[1] += dx;
  }
}

console.log(gpsCoordSum(grid2, "["));
