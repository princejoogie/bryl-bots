import Discord from "discord.js";
import { db } from "../utils/firebase";
import { Suggestion } from "../bot-types";

export const getSuggestions = async (msg: Discord.Message, id?: string) => {
  try {
    let res;
    if (id) {
      res = await db
        .collection("channels")
        .doc(msg.channel.id)
        .collection("suggestions")
        .where("user.id", "==", id)
        .orderBy("timestamp", "desc")
        .get();
    } else {
      res = await db
        .collection("channels")
        .doc(msg.channel.id)
        .collection("suggestions")
        .orderBy("timestamp", "desc")
        .get();
    }
    const suggestions = res.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Suggestion)
    );

    return suggestions;
  } catch (err) {
    console.log(err);
    msg.channel.send("`Something went wrong :(`");
    return [];
  }
};
