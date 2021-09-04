import Discord from "discord.js";
import { db } from "src/utils/firebase";

const args = ["lur", "prefix"] as const;

type ValidProps = typeof args[number];

module.exports = (msg: Discord.Message, args?: string[]) => {
  if (args && args?.length > 0) {
    const property = args[0];
    switch (property as ValidProps) {
      case "lur": {
        const _message = args.slice(1, args.length - 1).join(" ");
        if (_message.includes("__USER__") && _message.includes("__LEVEL__")) {
          msg.reply("successfully changed lur.");
          // db.collection("config")
          //   .doc("mee6")
          //   .set(
          //     {
          //       levelUpResponse: "Qwe",
          //     },
          //     { merge: true }
          //   )
          //   .then(() => {
          //     msg.reply("successfully changed lur.");
          //   })
          //   .catch(() => {
          //     msg.reply("something went wrong changing lur.");
          //   });
        } else {
          msg.reply("missing `__USER__` and `__LEVEL__` in string");
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
