import read from "../read.ts";

const input = await read(3);

const uncorruptedInstructions = Array.from(
  input.matchAll(/(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don't\(\))/g)
).map(match => match[0]);

let sum1 = 0;
let sum2 = 0;

let enabled = true;

uncorruptedInstructions.forEach(instruction => {
  switch (instruction) {
    case "don't()":
      enabled = false;
      break;
    case "do()":
      enabled = true;
      break;
    default: {
      // Mul(X,Y)
      const [a, b] = Array.from(
        instruction.matchAll(/\d+/g)
      ).map(match => Number(match[0]));
      sum1 += a * b;
      if (enabled) {
        sum2 += a * b;
      }
    }
  }
});

console.log(sum1);
console.log(sum2);
