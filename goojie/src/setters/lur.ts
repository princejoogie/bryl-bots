import { Message } from "discord.js";
import { refreshDbConfig } from "../utils/dbConstants";
import { db } from "../utils/firebase";

interface Props {
  msg: Message;
  lur: string;
}

const setLur = ({ msg, lur }: Props) => {
  db.collection("guilds")
    .doc(msg.guild?.id)
    .set(
      {
        levelUpResponse: lur.trim(),
      },
      { merge: true }
    )
    .then(() => {
      refreshDbConfig(msg)
        .then(() => {
          msg.reply("successfully changed lur.");
        })
        .catch((err) => {
          msg.reply(`something went wrong. ${err.message}`);
        });
    })
    .catch((err) => {
      msg.reply(`something went wrong. ${err.message}`);
    });
};

export default setLur;
