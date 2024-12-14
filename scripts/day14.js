import read from "../read.ts";

const input = await read(14);

const initialRobots = input
  .split("\n")
  .map(row =>
    row
      .split(" ")
      .map(stat =>
        stat
          .split("=")[1]
          .split(",")
          .map(Number)
      )
  );

const maxWidth = 101;
const maxHeight = 103;

const positionsAfterTime = (timeElapsed) => {
  const finalRobots = [];

  for (const [[px, py], [vx, vy]] of initialRobots) {
    finalRobots.push([
      (((px + timeElapsed * vx) % maxWidth) + maxWidth) % maxWidth,
      (((py + timeElapsed * vy) % maxHeight) + maxHeight) % maxHeight
    ])
  }

  return finalRobots;
}

let segmentScores = [0, 0, 0, 0];
for (const [x, y] of positionsAfterTime(100)) {
  const midX = (maxWidth - 1) / 2;
  const midY = (maxHeight - 1) / 2;
  if (x === midX || y === midY) continue;

  if (x < midX) {
    if (y < midY) {
      segmentScores[0]++
    } else {
      segmentScores[1]++
    }
  } else {
    if (y < midY) {
      segmentScores[2]++
    } else {
      segmentScores[3]++
    }
  }
}
console.log(segmentScores[0] * segmentScores[1] * segmentScores[2] * segmentScores[3]);


const getGrid = (positions) => {
  const grid = new Array(maxHeight).fill(0).map(_ => {
    return new Array(maxWidth).fill(0);
  });

  for (const [x, y] of positions) {
    grid[y][x] = 1;
  }

  return grid;
}

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const touchingRobots = (x, y, visited, grid) => {
  if (grid[y][x] === 0) return 0;

  const key = `${x},${y}`;
  if (visited.has(key)) return 0;
  visited.add(key);

  let numTouching = 1;
  for (const [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;

    if (newX < 0 || newX >= maxWidth || newY < 0 || newY >= maxHeight) continue;

    numTouching += touchingRobots(newX, newY, visited, grid);
  }

  return numTouching;
}

outer: for (let t = 0; ; t++) {
  const grid = getGrid(positionsAfterTime(t));
  const visited = new Set();

  for (let y = 0; y < maxHeight; y++) {
    for (let x = 0; x < maxWidth; x++) {
      // The christmas tree has exactly 229 robots touching
      if (touchingRobots(x, y, visited, grid) === 229) {
        console.log(t);
        break outer;
      }
    }
  }
}

/*
The image of the tree:
██████████████████████████████████████████████████████████████
██                                                          ██
██                                                          ██
██                                                          ██
██                                                          ██
██                            ██                            ██
██                          ██████                          ██
██                        ██████████                        ██
██                      ██████████████                      ██
██                    ██████████████████                    ██
██                        ██████████                        ██
██                      ██████████████                      ██
██                    ██████████████████                    ██
██                  ██████████████████████                  ██
██                ██████████████████████████                ██
██                    ██████████████████                    ██
██                  ██████████████████████                  ██
██                ██████████████████████████                ██
██              ██████████████████████████████              ██
██            ██████████████████████████████████            ██
██                ██████████████████████████                ██
██              ██████████████████████████████              ██
██            ██████████████████████████████████            ██
██          ██████████████████████████████████████          ██
██        ██████████████████████████████████████████        ██
██                          ██████                          ██
██                          ██████                          ██
██                          ██████                          ██
██                                                          ██
██                                                          ██
██                                                          ██
██                                                          ██
██████████████████████████████████████████████████████████████
*/
