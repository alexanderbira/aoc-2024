// I'm not proud of this one
import read from "../read.ts";

const input = await read(9);
const nums = input.split("").map(Number);

let buffer = [];

const chunks = [] //[startIndex, size, id]

let parity = true
let id = 0
for (const num of nums) {
  if (parity) {
    chunks.push([buffer.length, num, id])
    for (let i = 0; i < num; i++) {
      buffer.push(id.toString())
    }
    id++
  } else {
    for (let i = 0; i < num; i++) {
      buffer.push(".")
    }
  }

  parity = !parity;
}

let startptr = 0;

while (startptr <= buffer.length-1) {
  while (buffer[startptr] !== "." && startptr <= buffer.length-1) startptr++;
  while (buffer[buffer.length-1] === ".") buffer.pop()
  if (startptr > buffer.length-1) break;

  buffer[startptr] = buffer.pop();
  startptr++;
}

let checksum = 0;
for (let i = 0; i < buffer.length; i++) {
  checksum += i * Number(buffer[i])
}

console.log(checksum)

let currChunk = chunks.length-1

for (let i = 0; i < chunks.length; i++) {
  const [_, size, id] = chunks[currChunk];
  if (id === 0) break

  let success = false;
  for (let j = 0; j < Math.min(chunks.length-1, currChunk); j++) {
    const space = chunks[j+1][0] - (chunks[j][0]+chunks[j][1]);
    if (size <= space) {
      chunks[currChunk][0] = chunks[j][0]+chunks[j][1]
      chunks.splice(j+1, 0, chunks[currChunk]);
      chunks.splice(currChunk+1, 1);
      success = true
      break
    }
  }

  for (let i = 0; i < chunks.length; i++) {
    if (chunks[i][2] === id-1) {
      currChunk = i;
      break
    }
  }}

checksum = 0
for (const chunk of chunks) {
  let index = chunk[0]
  while (chunk[1] > 0) {
    chunk[1]--
    checksum += chunk[2] * index
    index++
  }
}

console.log(checksum)
