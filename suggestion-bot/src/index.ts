import Discord from "discord.js";
import path from "path";
import FS from "fs";
import { prefix } from "../config.json";
import { BASE_DIR } from "../constants";
const client = new Discord.Client();
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.BOT_TOKEN;
const extension = process.env.NODE_ENV === "development" ? ".ts" : ".js";

const getCommands = (): string[] => {
  const cmds: string[] = [];
  const dir = path.join(BASE_DIR, "./src", "./commands");
  FS.readdir(dir, (err, files) => {
    if (!err) {
      files.forEach((file) => cmds.push(file.replace(extension, "")));
    }
  });
  return cmds;
};

const commands: string[] = getCommands();

client.once("ready", () => {
  console.log(`Running in ${process.env.NODE_ENV}`);
  console.log("Suggestion Bot running, DO NOT CLOSE!");
});

client.on("message", (msg) => {
  if (msg.content.startsWith(prefix)) {
    let args = msg.content.split(" ");
    const cmd = args[0].substring(1, args[0].length);

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
  }
});

client.login(token);
