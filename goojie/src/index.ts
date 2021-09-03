import { Client } from "discord.js";
import path from "path";
import FS from "fs";
import { prefix } from "../config.json";
import { BASE_DIR } from "../constants";
import { db, timestamp, toServerDate } from "./utils/firebase";
import { getXpNeeded } from "./utils/magicalFunction";
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
  // TEMPORARY SET LEVEL UP LOGIC HERE
  if (msg.content.startsWith(prefix) && !msg.author.bot) {
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
        const data = snap.data();
        if (data) {
          const { level, xp, lastXpGain } = data;

          const dbDate = new Date(lastXpGain.toDate());
          const currDate = toServerDate(new Date()).toDate();
          const difference = Math.abs(
            (currDate.getTime() - dbDate.getTime()) / 1000
          );

          if (difference > 10) {
            const xpGain = Math.floor(Math.random() * 10) + 15;
            getXpNeeded(level, xp).then((xpNeeded) => {
              console.log("------------------------");
              console.log({ difference: `${difference}sec` });
              console.log(`+${xpGain}xp. new xp: ${xp + xpGain}`);
              if (xpGain >= xpNeeded) {
                console.log(`leveled up. new level: ${level + 1}`);
                userRef.update({
                  level: level + 1,
                  xp: xp + xpGain,
                  lastXpGain: timestamp(),
                });
              } else {
                userRef.update({
                  xp: xp + xpGain,
                  lastXpGain: timestamp(),
                });
              }
              console.log("------------------------");
            });
          } else {
            console.log("can only level up once per minute");
          }
        }
      } else {
        userRef.set({
          level: 0,
          xp: 0,
          lastXpGain: timestamp(),
        });
      }
    });

    // msg.reply(`Guild ID: ${msg.guild?.id}`);
    // msg.reply(`Channel ID: ${msg.channel?.id}`);
    // let args = msg.content.split(" ");
    // const cmd = args[0].substring(1, args[0].length);

    // if (commands.includes(cmd)) {
    //   args.splice(0, 1);
    //   const useCommand = require(path.join(
    //     BASE_DIR,
    //     "src",
    //     "commands",
    //     `${cmd}${extension}`
    //   ));
    //   useCommand(msg, args);
    // }
  }
  // handle level ups
  else {
    // TODO
  }
});

client.login(token);
