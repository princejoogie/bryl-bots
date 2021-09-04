import { Message } from "discord.js";
import {
  levelUpResponse as lur,
  prefix as _prefix,
} from "./goojie-config.json";
import { db } from "./firebase";

let prefix = _prefix;
let levelUpResponse = lur;
let lurRoomId = "";

export const refreshDbConfig = async (msg: Message) => {
  const snapshot = await db.collection("guilds").doc(msg.guild?.id).get();
  const data = snapshot.data();

  if (data) {
    prefix = data.prefix ?? _prefix;
    levelUpResponse = data.levelUpResponse ?? lur;
    lurRoomId = data.lurRoomId ?? "";
  }
};

export const getDbConfig = () => {
  return { prefix, levelUpResponse, lurRoomId };
};
