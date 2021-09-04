import Discord from "discord.js";
import { refreshDbConfig } from "../utils/dbConstants";
import { db } from "../utils/firebase";

const properties = ["lur", "prefix"] as const;

type ValidProps = typeof properties[number];

module.exports = (msg: Discord.Message, args?: string[]) => {
  if (args && args?.length > 0) {
    const property = args[0];
    switch (property as ValidProps) {
      case "lur": {
        const _message = args.slice(1, args.length).join(" ");

        if (_message.includes("--USER--") && _message.includes("--LEVEL--")) {
          db.collection("config")
            .doc("goojie")
            .set(
              {
                levelUpResponse: _message.trim(),
              },
              { merge: true }
            )
            .then(() => {
              refreshDbConfig()
                .then(() => {
                  msg.reply("successfully changed lur.");
                })
                .catch((err) => {
                  msg.reply(`Something went wrong. ${err.message}`);
                });
            })
            .catch((err) => {
              msg.reply(`Something went wrong. ${err.message}`);
            });
        } else {
          msg.reply("missing `--USER--` and `--LEVEL--` in string");
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
