import { prefix as _prefix } from "../../config.json";
import { levelUpResponse } from "./mee6-config.json";
import { db, firebase } from "./firebase";

let prefix = _prefix;
let mee6LevelUpResponse = levelUpResponse;
let data: firebase.firestore.DocumentData | undefined = undefined;

const run = () => {
  db.collection("config")
    .doc("mee6")
    .onSnapshot((snapshot) => {
      data = snapshot.data();
      if (data) {
        prefix = data.prefix ?? _prefix;
        mee6LevelUpResponse = data.levelUpResponse ?? levelUpResponse;
      }
    });
};

export const getDbConstants = () => {
  return { prefix, mee6LevelUpResponse, data };
};

export default run;
