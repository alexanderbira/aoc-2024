# Advent of Code JS/TS Template

This is a template for solving the Advent of Code challenges in JS/TS.

## Usage
To create a new solution for a day, make a new file in the `scripts` directory with the name `dayXX.ts` or `dayXX.js` where `XX` is the day number. E.g. `day01.ts`.

Copy the input for the day into a file named `inputXX.txt` in the `inputs` directory. E.g. `input01.txt`.

Add the following code to the top of the script file:
```typescript
import read from "../read.ts";
const input = await read(X);
```
Where `X` is the day number. (e.g. `const input = await read(1);`)
This will read the input file for the day and store it in the `input` variable.

Write your solution code below these lines.

To run the solution, use the following command:

```bash
deno task day X
```
Where `X` is the day number. (e.g. `deno task day 1`

Your solution will be run and the output will be displayed in the console along with the time it took to run.
