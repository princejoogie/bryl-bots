import Discord from "discord.js";
import { setPrefix, setLur } from "../setters";

const properties = ["lur", "prefix"] as const;

type ValidProps = typeof properties[number];

module.exports = (msg: Discord.Message, args?: string[]) => {
  if (args && args?.length > 0) {
    const property = args[0];
    switch (property as ValidProps) {
      case "lur": {
        const _lur = args.slice(1, args.length).join(" ");

        if (_lur.includes("--USER--") && _lur.includes("--LEVEL--")) {
          setLur({ msg, lur: _lur });
        } else {
          msg.reply("missing `--USER--` or `--LEVEL--` in argument.");
        }

        break;
      }
      case "prefix": {
        const _prefix = args.slice(1, args.length).join(" ");

        if (_prefix && !_prefix.match(/[a-z]/i)) {
          setPrefix({ msg, prefix: _prefix });
        } else {
          msg.reply("invalid prefix.");
        }

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
