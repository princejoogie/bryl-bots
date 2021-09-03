const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// const input = async (msg: string): Promise<string> => {
//   return await new Promise((resolve) =>
//     readline.question(msg, (result: string) => resolve(result))
//   );
// };

//   const currentLevel = +(await input("What is you current level? "));
//   const currentXp = +(await input("What is you current xp? "));

export const getXpNeeded = async (currentLevel: number, currentXp: number) => {
  const xpToLevel =
    (5 / 6) *
    currentLevel *
    (2 * currentLevel * currentLevel + 27 * currentLevel + 91);
  const xpNeeded = xpToLevel - currentXp;

  return xpNeeded;
};
