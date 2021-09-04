import { prefix as _prefix } from "../../config.json";
import { levelUpResponse } from "./mee6-config.json";
import { db, firebase } from "./firebase";

let prefix = _prefix;
let mee6LevelUpResponse = levelUpResponse;
let data: firebase.firestore.DocumentData | undefined = undefined;

export const refreshDbConfig = async () => {
  const snapshot = await db.collection("config").doc("goojie").get();
  data = snapshot.data();

  if (data) {
    prefix = data.prefix ?? _prefix;
    mee6LevelUpResponse = data.levelUpResponse ?? levelUpResponse;
  }
};

export const getDbConfig = () => {
  return { prefix, mee6LevelUpResponse, data };
};
