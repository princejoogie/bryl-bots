import { Message } from "discord.js";
import { refreshDbConfig } from "../utils/dbConstants";
import { db } from "../utils/firebase";

interface Props {
  msg: Message;
  prefix: string;
}

const setPrefix = ({ msg, prefix }: Props) => {
  db.collection("config")
    .doc("goojie")
    .set(
      {
        prefix: prefix.trim(),
      },
      { merge: true }
    )
    .then(() => {
      refreshDbConfig()
        .then(() => {
          msg.reply(`successfully changed prefix to ${prefix.trim()}.`);
        })
        .catch((err) => {
          msg.reply(`something went wrong. ${err.message}`);
        });
    })
    .catch((err) => {
      msg.reply(`something went wrong. ${err.message}`);
    });
};

export default setPrefix;
