const { Command } = require("discord.js-commando");
const { get } = require("snekfetch");

module.exports = class Cuddle extends Command {
    constructor(client) {
        super(client, {
            name: "cuddle",
            group: "roleplay",
            memberName: "cuddle",
            description: "Cuddle whoever you want.~ :3",
            examples: ["cuddle @User#1234"],
            args: [{
                key: "user",
                prompt: "Which user do you want to cuddle?~\n",
                type: "user"
            }]
        });
    }
    async run(msg, { user }) {
        const { body } = await get("https://rra.ram.moe/i/r?type=cuddle");
        if (user == this.client.user) {
            return msg.say("*cuddles you back*~ ❤", { files: [{ attachment: `https://rra.ram.moe/${body.path}`, name: `${body.path}` }] });
        }
        if (user == msg.author) {
            return msg.say(`I-I'm sorry you're lonely ${user}. *cuddles*~ ❤`, { files: [{ attachment: `https://rra.ram.moe/${body.path}`, name: `${body.path}` }] });
        }
        return msg.say(`*${msg.author.toString()} cuddles ${user}*~ ❤`, { files: [{ attachment: `https://rra.ram.moe/${body.path}`, name: `${body.path}` }] });
    }
};
