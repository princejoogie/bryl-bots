import Discord from "discord.js";
import { getSuggestions } from "../helpers";

const listSuggestions = async (msg: Discord.Message) => {
  try {
    const suggestions = await getSuggestions(msg);

    if (!suggestions.length) {
      let reply = "```\n";
      reply += "No Suggestions yet.\n";
      reply += "```";

      msg.channel.send(reply);
    } else {
      let reply = "```\n";
      reply += "Current Suggestions:\n";
      suggestions.map((e, i) => {
        reply += `${i + 1}. ${e.suggestion} (${e.votes.length} vote/s)\n`;
      });
      reply += "```";

      msg.channel.send(reply);
    }
  } catch (err) {
    console.log(err);
    msg.channel.send("`Something went wrong :(`");
  }
};

const listSuggestionsByID = async (msg: Discord.Message, id: string) => {
  try {
    const suggestions = await getSuggestions(msg, id);

    let reply = "```\n";
    reply += `${msg.author.username}'s Suggestions:\n`;
    suggestions.map((e, i) => {
      reply += `${i + 1}. ${e.suggestion} (${e.votes.length} vote/s)\n`;
    });
    reply += "```";

    msg.channel.send(reply);
  } catch (err) {
    console.log(err);
    msg.channel.send("`Something went wrong :(`");
  }
};

module.exports = (msg: Discord.Message, args: string[]) => {
  if (!args.length) {
    listSuggestions(msg);
  } else if (args.join(" ").trim() === "mine") {
    listSuggestionsByID(msg, msg.author.id);
  } else {
    msg.reply("Not a command.");
  }
};
