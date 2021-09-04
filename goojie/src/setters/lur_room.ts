import { Message } from "discord.js";
import { refreshDbConfig } from "../utils/dbConstants";
import { db } from "../utils/firebase";

interface Props {
  msg: Message;
  lurRoomId: string;
}

const setLurRoomId = ({ msg, lurRoomId }: Props) => {
  db.collection("guilds")
    .doc(msg.guild?.id)
    .set(
      {
        lurRoomId,
      },
      { merge: true }
    )
    .then(() => {
      refreshDbConfig(msg)
        .then(() => {
          msg.reply(`successfully changed lur room id to ${lurRoomId}.`);
        })
        .catch((err) => {
          msg.reply(`something went wrong. ${err.message}`);
        });
    })
    .catch((err) => {
      msg.reply(`something went wrong. ${err.message}`);
    });
};

export default setLurRoomId;
