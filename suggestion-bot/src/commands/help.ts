import Discord from "discord.js";

module.exports = (msg: Discord.Message) => {
  let reply = "```\n";
  reply += "!suggest <your suggestion here>\n";
  reply += "  - Adds your suggestion in databse\n";
  reply += "!list\n";
  reply += "  - Lists all CURRENT suggestions\n";
  reply += "!list mine\n";
  reply += "  - Lists all YOUR suggestions\n";
  reply += "!vote <number>\n";
  reply += "  - Vote a suggestion (use after !list)\n";
  reply += "```";
  msg.channel.send(reply);
};
