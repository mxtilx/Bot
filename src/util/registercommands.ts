import { ApplicationCommandDataResolvable, Client } from "discord.js";
import fs from 'fs';
import Logger from "./logger";
const log = new Logger("Discord");

export default async function register() {
    const allCommands: ApplicationCommandDataResolvable[] = [];
    await fs.readdirSync('./src/commands').forEach(async file => {
        await import(`../commands/${file}`).then(async module => {
            const target = module.default.command;
            if (!target) return;
            await allCommands.push(target.toJSON());
            log.info(`Registered command /${target.name}`);
        });
    });
    return allCommands;
}