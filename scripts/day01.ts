import read from "../read.ts"

const input = await read(1)

const locationIds = input.split("\n").map(row => row.split("   ").map(Number))

const leftIds = locationIds.map(x => x[0])
const rightIds = locationIds.map(x => x[1])

leftIds.sort((a, b) => a - b)
rightIds.sort((a, b) => a - b)

let totalDistance = 0
for (let i = 0; i < leftIds.length; i++) {
  totalDistance += Math.abs(leftIds[i] - rightIds[i])
}
console.log(totalDistance)

let similarityScore = 0
for (const leftId of leftIds) {
  let numLeftInRight = 0;
  for (const rightId of rightIds) {
    if (leftId === rightId) numLeftInRight++;
  }
  similarityScore += leftId * numLeftInRight
}
console.log(similarityScore)