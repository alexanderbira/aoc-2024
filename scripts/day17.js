import read from "../read.ts";

const input = await read(17);

const [a, b] = input.split("\n\n");

const registers_ = a.split("\n").map(x => Number(x.split(": ")[1]));
const instructions = b.split(": ")[1].split(",").map(Number);

// It's a shame that JS bitwise operators only work for up to 32-bit numbers
const withRegA = (a) => {
  const comboVal = (n) => {
    if (n <= 3) return n;
    if (n <= 6) return registers[n - 4];
  }

  const registers = [...registers_];
  registers[0] = a;
  const output = [];

  for (let ip = 0; ip < instructions.length - 1; ip += 2) {
    const operand = instructions[ip + 1];
    switch (instructions[ip]) {
      case 0: //adv
        registers[0] = Math.floor(registers[0] / (2 ** comboVal(operand)));
        break;
      case 1: //bxl
        registers[1] = registers[1] ^ operand;
        break;
      case 2: //bst
        registers[1] = comboVal(operand) & 7;
        break;
      case 3: //jnz
        if (registers[0] !== 0) {
          ip = operand - 2;
        }
        break;
      case 4: //bxc
        registers[1] = registers[1] ^ registers[2];
        break;
      case 5: //out
        output.push(comboVal(operand) & 7);
        break;
      case 6: //bdv
        registers[1] = Math.floor(registers[0] / (2 ** comboVal(operand)));
        break;
      case 7: //cdv
        registers[2] = Math.floor(registers[0] / (2 ** comboVal(operand)));
        break;
    }
  }

  return output;
}

console.log(withRegA(registers_[0]).join(","));

// I spent way too long trying to mathematically invert the program
// https://stackoverflow.com/a/45909278/12309608

const getRegA = (regA, instruction) => {
  if (instruction < 0) return regA;

  // for (let regToTry = regA << 3; regToTry < ((regA << 3) | 7); regToTry++) {
  for (let regToTry = regA * 8; regToTry < regA * 8 + 8; regToTry++) {

    if (withRegA(regToTry)[0] === instructions[instruction]) {
      const withTry = getRegA(regToTry, instruction - 1);
      if (withTry >= 0) return withTry;
    }
  }

  return -1;
}

console.log(getRegA(0, instructions.length - 1));
