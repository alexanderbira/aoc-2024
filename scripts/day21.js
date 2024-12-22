// Not polishing this one
import read from "../read.ts";

const input = await read(21);

const codes = input.split("\n");

const numericalKeypad = {
  "7": [0, 0],
  "8": [0, 1],
  "9": [0, 2],
  "4": [1, 0],
  "5": [1, 1],
  "6": [1, 2],
  "1": [2, 0],
  "2": [2, 1],
  "3": [2, 2],
  "0": [3, 1],
  "A": [3, 2]
};

const directionalKeypad = {
  "^": [0, 1],
  "A": [0, 2],
  "<": [1, 0],
  "v": [1, 1],
  ">": [1, 2]
};

const getPaths = ([fromY, fromX], [toY, toX], [badY, badX]) => {
  if (fromY === toY && fromX === toX) return ["A"];

  let dy = fromY - toY;
  let dx = fromX - toX;

  let paths = [];

  if (dy > 0) {
    if (!(fromY - 1 === badY && fromX === badX))
      paths = [...paths, ...getPaths([fromY - 1, fromX], [toY, toX], [badY, badX]).map(x => "^" + x)];
  }

  if (dy < 0) {
    if (!(fromY + 1 === badY && fromX === badX))
      paths = [...paths, ...getPaths([fromY + 1, fromX], [toY, toX], [badY, badX]).map(x => "v" + x)];
  }

  if (dx > 0) {
    if (!(fromY === badY && fromX - 1 === badX))
      paths = [...paths, ...getPaths([fromY, fromX - 1], [toY, toX], [badY, badX]).map(x => "<" + x)];
  }

  if (dx < 0) {
    if (!(fromY === badY && fromX + 1 === badX))
      paths = [...paths, ...getPaths([fromY, fromX + 1], [toY, toX], [badY, badX]).map(x => ">" + x)];
  }

  return paths;
}

const solve = (n) => {

  const shortestNumToNum = {};
  const getShortestNumerical = (code) => {
    let sum = 0;
    code = "A" + code;

    for (let i = 0; i < code.length - 1; i++) {
      sum += shortestNumToNum[`${code[i]}${code[i + 1]}`];
    }

    return sum;
  }

  // Top-down for the directions
  const memo = {};
  const getShortestDirectionIteration = (code, iterationsLeft) => {
    if (iterationsLeft === 0) return code.length;
    code = "A" + code;

    const key = `${code},${iterationsLeft}`;
    if (key in memo) return memo[key];

    let sum = 0;
    for (let i = 0; i < code.length - 1; i++) {
      const paths = getPaths(directionalKeypad[code[i]], directionalKeypad[code[i + 1]], [0, 0]);

      let min = Infinity;
      for (const path of paths) {
        const now = getShortestDirectionIteration(path, iterationsLeft - 1);
        if (now < min) min = now;
      }

      sum += min;
    }

    return memo[key] = sum;
  }

  // Bottom-up for the numbers
  const nums = "1234567890A".split("");
  for (const num1 of nums) {
    for (const num2 of nums) {
      let best = Infinity;

      const allPaths = getPaths(numericalKeypad[num1], numericalKeypad[num2], [3, 0]);
      for (const way of allPaths) {
        let now = getShortestDirectionIteration(way, n);
        if (now < best) best = now;
      }

      shortestNumToNum[`${num1}${num2}`] = best;
    }
  }

  let sum = 0;
  for (const code of codes) {
    const num = Number(code.slice(0, code.length - 1));
    const length = getShortestNumerical(code);
    sum += num * length;
  }

  return sum;
}

console.log(solve(2));
console.log(solve(25));
