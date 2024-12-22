import read from "../read.ts";

const input = await read(22);

const secretNums = input.split("\n").map(Number);

const modVal = 16777216;

const getNextSecret = (secret) => {
  secret = (secret ^ (secret * 64)) % modVal;
  secret = (secret ^ Math.floor(secret / 32)) % modVal;
  secret = (secret ^ (secret * 2048)) % modVal;
  return (secret + modVal) % modVal;
}

const gains = {};

let sum = 0;
for (const secretNum of secretNums) {
  let currSecret = secretNum;
  const prevSecrets = [];
  const seen = new Set();

  for (let i = 0; i < 2000; i++) {
    const nextSecret = getNextSecret(currSecret);
    prevSecrets.push(nextSecret % 10 - currSecret % 10);
    currSecret = nextSecret;

    if (i >= 3) {
      const sequence = `${prevSecrets[i-3]},${prevSecrets[i-2]},${prevSecrets[i-1]},${prevSecrets[i]}`;
      if (!seen.has(sequence)) {
        seen.add(sequence);
        if (!(sequence in gains)) gains[sequence] = 0;
        gains[sequence] += currSecret % 10;
      }
    }
  }

  sum += currSecret;
}

console.log(sum);
console.log(Math.max(...Object.values(gains)));
