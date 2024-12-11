import read from "../read.ts";

const input = await read(11);

let stones = input.split(" ").map(Number);

const memo = {};
const lengthAfter = (stone, iterations) => {
  if (iterations === 0) return 1;

  const key = `${stone},${iterations}`;
  if (key in memo) return memo[key];

  // 0 -> 1
  if (stone === 0) return memo[key] = lengthAfter(1, iterations - 1);

  // Even -> halves
  const strStone = stone.toString();
  if (strStone.length % 2 === 0) return memo[key] =
    lengthAfter(Number(strStone.slice(0, strStone.length / 2)), iterations - 1) +
    lengthAfter(Number(strStone.slice(strStone.length / 2)), iterations - 1);

  // *2024
  return memo[key] = lengthAfter(stone * 2024, iterations - 1);
}

const stonesLengthAfter = (n) => stones.reduce((acc, cur) => acc + lengthAfter(cur, n), 0);

console.log(stonesLengthAfter(25));
console.log(stonesLengthAfter(75));
