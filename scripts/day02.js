import read from "../read.ts";

const input = await read(2);

const reports = input.split("\n").map(row => row.split(" ").map(Number));

const isSafe = (row) => {
  let curr = row[0];

  let allInc = true;
  for (let i = 1; i < row.length; i++) {
    if (!(row[i] > curr && (row[i] - curr) < 4)) {
      allInc = false;
      break;
    }
    curr = row[i];
  }
  if (allInc) return true;

  curr = row[0];

  let allDec = true;
  for (let i = 1; i < row.length; i++) {
    if (!(row[i] < curr && (curr - row[i]) < 4)) {
      allDec = false;
      break;
    }
    curr = row[i];
  }

  return allDec;
}

let numSafeReports = 0;
let dampenedNumSafeReports = 0;

for (const row of reports) {
  if (isSafe(row)) numSafeReports++;

  for (let i = 0; i < row.length; i++) {
    const newRow = [...row];
    newRow.splice(i, 1);
    if (isSafe(newRow)) {
      dampenedNumSafeReports++;
      break;
    }
  }
}
console.log(numSafeReports);
console.log(dampenedNumSafeReports);
