/*
 * NOTE: pure node tests
 * const readline = require("readline").createInterface({
 *   input: process.stdin,
 *   output: process.stdout,
 * });
 * const input = async (msg: string): Promise<string> => {
 *   return await new Promise((resolve) =>
 *     readline.question(msg, (result: string) => resolve(result))
 *   );
 * };
 *   const currentLevel = +(await input("What is you current level? "));
 *   const currentXp = +(await input("What is you current xp? "));
 */

import { timestamp, firebase } from "./firebase";
import { Message } from "discord.js";
import { getDbConfig } from "./dbConstants";
import { client } from "../index";

export const getXpNeeded = async (currentLevel: number, currentXp: number) => {
  const xpToLevel =
    (5 / 6) *
    currentLevel *
    (2 * currentLevel * currentLevel + 27 * currentLevel + 91);
  const xpNeeded = xpToLevel - currentXp;

  return xpNeeded;
};

interface GetTimeDifferenceProps {
  start: Date;
  end: Date;
}

export const getTimeDifference = ({ start, end }: GetTimeDifferenceProps) => {
  const difference = Math.abs((end.getTime() - start.getTime()) / 1000);
  return difference;
};

interface GiveXpProps {
  level: number;
  xp: number;
  userRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
  msg: Message;
}

export const giveXp = async ({ level, xp, userRef, msg }: GiveXpProps) => {
  const { levelUpResponse, lurRoomId } = getDbConfig();
  const xpGain = Math.floor(Math.random() * 10) + 15;
  const xpNeeded = await getXpNeeded(level, xp);

  let newLevel = level;
  let newXp = xp + xpGain;

  if (xpGain >= xpNeeded) {
    newLevel = level + 1;
    const message = levelUpResponse
      .replace(/--USER--/g, `${msg.author}`)
      .replace(/--LEVEL--/g, `${newLevel}`);

    if (!!lurRoomId) {
      const channel = msg.guild?.channels.cache.get(lurRoomId);

      if (channel && channel.isText()) {
        channel.send(message);
      } else {
        msg.channel.send(message);
      }
    } else {
      msg.channel.send(message);
    }
  }

  console.log({ newLevel, newXp });

  userRef.set(
    {
      level: newLevel,
      xp: newXp,
      lastXpGain: timestamp(),
    },
    { merge: true }
  );
};
