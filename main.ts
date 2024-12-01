const dayNum = Deno.args[0].padStart(2, "0");

const runFile = async (path: string) => {
  try {
    await Deno.stat(path);
    await import(path);

  } catch (err) {
    if (err instanceof Deno.errors.NotFound) return false;
    console.error("Error:", err);
  }

  return true;
}

const tsPath = `./scripts/day${dayNum}.ts`;
const jsPath = `./scripts/day${dayNum}.js`;

console.log(`Running Day ${dayNum}:`);
console.time("Finished in");

if (
    !(await runFile(tsPath)) &&
    !(await runFile(jsPath))
) {
  console.error(`No script found for Day ${dayNum}`);
}

console.timeEnd("Finished in");
