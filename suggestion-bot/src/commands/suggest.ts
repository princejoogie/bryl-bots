import Discord from "discord.js";
import { db, timestamp } from "../utils/firebase";
import { Suggestion, User } from "../bot-types";

const addSuggestion = async (msg: Discord.Message, suggestion: Suggestion) => {
  const docRef = db.collection("channels").doc(msg.channel.id);
  const docData = await (await docRef.get()).data();
  if (docData === undefined) {
    await docRef.set({
      id: msg.channel.id,
    });
  }
  await docRef.collection("suggestions").add(suggestion);
};

module.exports = (msg: Discord.Message, args: string[]) => {
  const suggestion = args.join(" ").trim();
  if (!suggestion) {
    msg.reply("Invalid argument.");
  } else {
    const user: User = {
      id: msg.author.id,
      photoURL: msg.author.avatarURL() ?? "",
      name: msg.author.username,
    };
    const data: Suggestion = {
      suggestion,
      user,
      timestamp: timestamp(),
      votes: [],
    };

    addSuggestion(msg, data);
    msg.reply("Suggestion Added!");
  }
};
