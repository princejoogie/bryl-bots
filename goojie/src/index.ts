import { Client } from "discord.js";
import path from "path";
import FS from "fs";
import { BASE_DIR } from "../constants";
import { db, timestamp, toServerDate } from "./utils/firebase";
import { getTimeDifference, giveXp } from "./utils/magicalFunction";
import { getDbConfig, refreshDbConfig } from "./utils/dbConstants";

const client = new Client();
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.BOT_TOKEN;
const extension = process.env.NODE_ENV === "development" ? ".ts" : ".js";

const getCommands = (): string[] => {
  const _commands: string[] = [];
  const dir = path.join(BASE_DIR, "./src", "./commands");
  FS.readdir(dir, (err, files) => {
    if (!err) {
      files.forEach((file) => _commands.push(file.replace(extension, "")));
    }
  });
  return _commands;
};

const commands: string[] = getCommands();

client.once("ready", () => {
  console.clear();
  console.log(`Running in ${process.env.NODE_ENV}`);
  console.log("MEE69 Bot running, DO NOT CLOSE!");
});

client.on("message", (msg) => {
  refreshDbConfig(msg).then(() => {
    const { prefix } = getDbConfig();

    if (msg.content.startsWith(prefix) && !msg.author.bot) {
      // HANDLING OF COMMANDS
      let args = msg.content.split(" ");
      const cmd = args[0].substring(prefix.length, args[0].length);

      if (commands.includes(cmd)) {
        args.splice(0, 1);
        const useCommand = require(path.join(
          BASE_DIR,
          "src",
          "commands",
          `${cmd}${extension}`
        ));
        useCommand(msg, args);
      }
    } else if (!msg.author.bot) {
      // HANDLING OF LEVEL UPS
      const guildRef = db.collection("guilds").doc(msg.guild?.id);
      const userRef = guildRef.collection("users").doc(msg.author.id);

      guildRef.set(
        {
          lastMessageAt: timestamp(),
        },
        { merge: true }
      );

      userRef.get().then((snap) => {
        if (snap.exists) {
          // existing member
          const data = snap.data();
          if (data) {
            const { level, xp, lastXpGain } = data;

            const dbDate = new Date(lastXpGain.toDate());
            const currDate = toServerDate(new Date()).toDate();
            const difference = getTimeDifference({
              start: dbDate,
              end: currDate,
            });

            if (difference > 60) {
              giveXp({ level, xp, userRef, msg });
            }
          }
        } else {
          // new member
          giveXp({ level: 0, xp: 0, userRef, msg });
        }
      });
    }
  });
});

client.login(token);
