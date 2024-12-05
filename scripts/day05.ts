import read from "../read.ts";

const input = await read(5);

const [rules_, updates_] = input.split("\n\n");
const rules = rules_.split("\n").map(row => row.split("|").map(Number));
const updates = updates_.split("\n").map(row => row.split(",").map(Number));

let sum1 = 0;
let sum2 = 0;

updateLoop: for (const update of updates) {
  for (const [p1, p2] of rules) {
    const p1Index = update.findIndex(p => p === p1);
    const p2Index = update.findIndex(p => p === p2);

    if (p1Index !== -1 && p2Index !== -1 && p1Index >= p2Index) {
      update.sort((a, b) =>
        rules.find(r => r[0] === a && r[1] === b) === undefined ? 1 : -1
      );
      sum2 += update[(update.length - 1) / 2];
      continue updateLoop;
    }

  }
  sum1 += update[(update.length - 1) / 2];
}

console.log(sum1);
console.log(sum2);
