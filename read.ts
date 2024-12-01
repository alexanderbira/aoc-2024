const read = async (day: number): Promise<string> => {
  return await Deno.readTextFile(`inputs/day${day.toString().padStart(2, "0")}.txt`);
};

export default read;
