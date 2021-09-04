import { Message } from "discord.js";
import { refreshDbConfig } from "../utils/dbConstants";
import { db } from "../utils/firebase";

interface Props {
  msg: Message;
  prefix: string;
}

const setPrefix = ({ msg, prefix }: Props) => {
  db.collection("guilds")
    .doc(msg.guild?.id)
    .set(
      {
        prefix: prefix,
      },
      { merge: true }
    )
    .then(() => {
      refreshDbConfig(msg)
        .then(() => {
          msg.reply(`successfully changed prefix to ${prefix}.`);
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
