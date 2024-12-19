import read from "../read.ts";

const input = await read(19);

const [a, b] = input.split("\n\n");

const availablePatterns = a.split(", ");
const designs = b.split("\n");

const numWays = {"": 1};
const getNumWays = (target) => {
  if (target in numWays) return numWays[target];

  let ways = 0;

  for (const pattern of availablePatterns) {
    if (target.startsWith(pattern)) {
      ways += getNumWays(target.slice(pattern.length));
    }
  }

  return numWays[target] = ways;
}

let numPossible = 0;
let totalWays = 0;
for (const target of designs) {
  let currWays = getNumWays(target);
  if (currWays > 0) {
    numPossible++;
  }
  totalWays += currWays;
}

console.log(numPossible);
console.log(totalWays);
