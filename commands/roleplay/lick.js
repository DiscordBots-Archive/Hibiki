const { Command } = require("discord.js-commando");
const { get } = require("snekfetch");

module.exports = class Lick extends Command {
    constructor(client) {
        super(client, {
            name: "lick",
            group: "roleplay",
            memberName: "lick",
            description: "Lick whoever you want.~ :3 hehe",
            examples: ["lick @User#1234"],
            args: [{
                key: "user",
                prompt: "Which user do you want to lick?~\n",
                type: "user"
            }]
        });
    }
    async run(msg, { user }) {
        const { body } = await get("https://rra.ram.moe/i/r?type=lick");
        if (user == this.client.user) {
            return msg.say("*licks you back*~ ❤", { files: [{ attachment: `https://rra.ram.moe/${body.path}`, name: `${body.path}` }] });
        }
        if (user == msg.author) {
            return msg.say(`${user} is licking themselves..?`, { files: [{ attachment: `https://rra.ram.moe/${body.path}`, name: `${body.path}` }] });
        }
        return msg.say(`*${msg.author.toString()} licks ${user}*~ ❤`, { files: [{ attachment: `https://rra.ram.moe/${body.path}`, name: `${body.path}` }] });
    }
};
