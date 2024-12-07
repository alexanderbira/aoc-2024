import read from "../read.ts";

const input = await read(7);

const reVals: [number, number[]][] = input.split("\n").map((row) => {
  const [target, parts] = row.split(": ");
  return [Number(target), parts.split(" ").map(Number)];
});

const isPossible = (
  target: number,
  parts: number[],
  acc: number,
  used: number,
  concat: boolean,
): boolean => {
  if (used === parts.length) return acc === target;

  if (isPossible(target, parts, acc + parts[used], used + 1, concat)) {
    return true;
  }
  if (isPossible(target, parts, acc * parts[used], used + 1, concat)) {
    return true;
  }

  return (
    concat && isPossible(
      target,
      parts,
      parseInt(`${acc}${parts[used]}`),
      used + 1,
      concat,
    )
  );
};

let sum1 = 0;
let sum2 = 0;
for (const [target, parts] of reVals) {
  if (isPossible(target, parts, 0, 0, false)) {
    sum1 += target;
    sum2 += target;
  } else if (isPossible(target, parts, 0, 0, true)) {
    sum2 += target;
  }
}

console.log(sum1);
console.log(sum2);
