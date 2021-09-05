import { GuildMember } from "discord.js";
import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import { WEB_APP_URL } from "../../constants";

export const getWelcomeImage = async (member: GuildMember) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const tag = encodeURIComponent(member.user.tag);
  const count = member.guild.memberCount;
  const imageUrl = encodeURIComponent(member.user.displayAvatarURL());

  await page.goto(
    `${WEB_APP_URL}/api/welcome-message?tag=${tag}&count=${count}&image_url=${imageUrl}`,
    {
      waitUntil: "networkidle2",
    }
  );

  await page.waitForSelector("#welcome_message");
  const element = await page.$("#welcome_message");
  const pathOfFile = path.join(
    __dirname,
    "temp",
    `${tag}-${new Date().getTime()}.png`
  );
  await element?.screenshot({
    path: pathOfFile,
  });

  if (fs.existsSync(pathOfFile)) return pathOfFile;
  else return null;
};
