import read from "../read.ts";
import {create, all} from "mathjs";

const input = await read(13);

const math = create(all, {});

const machines = input
  .split("\n\n")
  .map(machine => machine
    .split("\n")
    .map(row => row
      .match(/[0-9]+/g)
      .map(Number)
    )
  );

const basicallyInt = (x) => Math.abs(x - Math.round(x)) < 0.001; // Seems to work

function solve() {
  let minSum = 0;

  for (let [[adx, ady], [bdx, bdy], [px, py]] of machines) {
    const ab = math.multiply(
      math.inv(math.matrix([
        [adx, bdx],
        [ady, bdy]
      ])),
      math.matrix([
        [px],
        [py]
      ])
    );
    const a = ab.get([0, 0]);
    const b = ab.get([1, 0]);
    if (basicallyInt(a) && basicallyInt(b)) {
      minSum += a * 3 + b;
    }
  }

  console.log(minSum);
}

solve();

for (let i = 0; i < machines.length; i++) {
  machines[i][2][0] += 10000000000000;
  machines[i][2][1] += 10000000000000;
}

solve();
