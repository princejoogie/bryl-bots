const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = async (msg: string): Promise<string> => {
  return await new Promise((resolve) =>
    readline.question(msg, (res) => resolve(res))
  );
};

// magical function to get needed xp
const main = async () => {
  const currentLevel = +(await input("What is you current level? "));
  const currentXp = +(await input("What is you current xp? "));

  const xpToLevel =
    (5 / 6) *
    currentLevel *
    (2 * currentLevel * currentLevel + 27 * currentLevel + 91);
  const xpNeeded = xpToLevel - currentXp;

  console.log(`You need ${xpNeeded} to level up.`);
  process.exit(0);
};

main();
