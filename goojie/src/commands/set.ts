import Discord from "discord.js";
import setLur from "../setters/lur";

const properties = ["lur", "prefix"] as const;

type ValidProps = typeof properties[number];

module.exports = (msg: Discord.Message, args?: string[]) => {
  if (args && args?.length > 0) {
    const property = args[0];
    switch (property as ValidProps) {
      case "lur": {
        const _message = args.slice(1, args.length).join(" ");

        if (_message.includes("--USER--") && _message.includes("--LEVEL--")) {
          setLur({ msg, lur: _message });
        } else {
          msg.reply("missing `--USER--` or `--LEVEL--` in argument");
        }

        break;
      }
      case "prefix": {
        break;
      }
      default: {
        msg.reply("invalid property.");
        break;
      }
    }
  } else {
    msg.reply("invalid property.");
    return;
  }
};
