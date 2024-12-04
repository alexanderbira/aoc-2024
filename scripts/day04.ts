import read from "../read.ts";

const input = await read(4);

const letters = input.split("\n").map(r => r.split(""));

let xmas_count = 0;
let x_mas_count = 0;

for (let y = 0; y < letters.length; y++) {
  for (let x = 0; x < letters[0].length; x++) {
    if (letters[y][x] === "X") {
      if (letters?.[y]?.[x + 1] === "M" && letters?.[y]?.[x + 2] === "A" && letters?.[y]?.[x + 3] === "S") xmas_count++;
      if (letters?.[y]?.[x - 1] === "M" && letters?.[y]?.[x - 2] === "A" && letters?.[y]?.[x - 3] === "S") xmas_count++;
      if (letters?.[y + 1]?.[x] === "M" && letters?.[y + 2]?.[x] === "A" && letters?.[y + 3]?.[x] === "S") xmas_count++;
      if (letters?.[y - 1]?.[x] === "M" && letters?.[y - 2]?.[x] === "A" && letters?.[y - 3]?.[x] === "S") xmas_count++;

      if (letters?.[y - 1]?.[x - 1] === "M" && letters?.[y - 2]?.[x - 2] === "A" && letters?.[y - 3]?.[x - 3] === "S") xmas_count++;
      if (letters?.[y - 1]?.[x + 1] === "M" && letters?.[y - 2]?.[x + 2] === "A" && letters?.[y - 3]?.[x + 3] === "S") xmas_count++;
      if (letters?.[y + 1]?.[x - 1] === "M" && letters?.[y + 2]?.[x - 2] === "A" && letters?.[y + 3]?.[x - 3] === "S") xmas_count++;
      if (letters?.[y + 1]?.[x + 1] === "M" && letters?.[y + 2]?.[x + 2] === "A" && letters?.[y + 3]?.[x + 3] === "S") xmas_count++;
    }

    if (letters[y][x] === "A") {
      if (letters?.[y - 1]?.[x - 1] === "M" && letters?.[y + 1]?.[x + 1] === "S" && letters?.[y - 1]?.[x + 1] === "M" && letters?.[y + 1]?.[x - 1] === "S") x_mas_count++;
      if (letters?.[y - 1]?.[x - 1] === "S" && letters?.[y + 1]?.[x + 1] === "M" && letters?.[y - 1]?.[x + 1] === "M" && letters?.[y + 1]?.[x - 1] === "S") x_mas_count++;
      if (letters?.[y - 1]?.[x - 1] === "M" && letters?.[y + 1]?.[x + 1] === "S" && letters?.[y - 1]?.[x + 1] === "S" && letters?.[y + 1]?.[x - 1] === "M") x_mas_count++;
      if (letters?.[y - 1]?.[x - 1] === "S" && letters?.[y + 1]?.[x + 1] === "M" && letters?.[y - 1]?.[x + 1] === "S" && letters?.[y + 1]?.[x - 1] === "M") x_mas_count++;
    }
  }
}

console.log(xmas_count);
console.log(x_mas_count);
