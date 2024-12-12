import read from "../read.ts";

const input = await read(12);

const plots = input.split("\n").map(row => row.split(""));
const height = plots.length;
const width = plots[0].length;

const visited = new Set();

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

const areaPerimeter = (y, x, perimeterPoints) => {
  const key = `${y},${x}`;
  if (visited.has(key)) return [0, 0];
  visited.add(key);

  // Area, perimeter
  let toReturn = [1, 0];

  // Visit all the neighbours
  for (let dir = 0; dir < directions.length; dir++) {
    const [dy, dx] = directions[dir];
    const newY = y + dy;
    const newX = x + dx;

    // If we're in a new region
    if (newY === height || newY < 0 || newX === width || newX < 0 || plots[y][x] !== plots[newY][newX]) {
      toReturn[1]++;
      if (!(key in perimeterPoints)) perimeterPoints[key] = [];
      perimeterPoints[key].push(dir);

    } else {
      const [rArea, rPerim] = areaPerimeter(newY, newX, perimeterPoints);
      toReturn[0] += rArea;
      toReturn[1] += rPerim;
    }
  }

  return toReturn;
}

/*
Each perimeter point stores the sides on which it borders another region.
For vertical borders, we add 1 to the number of sides if there is no point above it which has a border in the same direction
Similarly for horizontal sides, but with cells to the left.

E.g.

X
X

has perimeterPoints:
{
  "0,0": [UP, RIGHT, LEFT],
  "1,0": [RIGHT, DOWN, LEFT]
}

Process 0,0 -> numSides = 3
Process 0,1 -> we do not count RIGHT and LEFT, since the cell above it has RIGHT and LEFT - we only count DOWN. numSides = 4

I have no clue if this is the "right" way to count sides but it seems to work.
*/
const numSides = (perimeterPoints) => {
  let numSides = 0;

  for (const [key, dirs] of Object.entries(perimeterPoints)) {
    const [y, x] = key.split(",").map(Number);

    if (dirs.includes(0) && !((`${y},${x - 1}` in perimeterPoints) && perimeterPoints[`${y},${x - 1}`].includes(0))) numSides++;
    if (dirs.includes(2) && !((`${y},${x - 1}` in perimeterPoints) && perimeterPoints[`${y},${x - 1}`].includes(2))) numSides++;
    if (dirs.includes(1) && !((`${y - 1},${x}` in perimeterPoints) && perimeterPoints[`${y - 1},${x}`].includes(1))) numSides++;
    if (dirs.includes(3) && !((`${y - 1},${x}` in perimeterPoints) && perimeterPoints[`${y - 1},${x}`].includes(3))) numSides++;
  }

  return numSides;
}

let sum1 = 0;
let sum2 = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const key = `${y},${x}`;

    if (!visited.has(key)) {
      const perimeterPoints = {};
      const [area, perimeter] = areaPerimeter(y, x, perimeterPoints);
      sum1 += area * perimeter;
      sum2 += area * numSides(perimeterPoints);
    }
  }
}

console.log(sum1);
console.log(sum2);
