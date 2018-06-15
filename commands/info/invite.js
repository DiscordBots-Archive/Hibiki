const { Command } = require("discord.js-commando");
const { invite } = require("../../config/opts");

module.exports = class Invite extends Command {
    constructor(client) {
        super(client, {
            name: "invite",
            aliases: ["add", "join"],
            group: "info",
            memberName: "info",
            description: "Gives you the useful invite links about this bot."
        });
    }

    async run (msg) {
        const inv = await this.client.generateInvite(["MANAGE_GUILD", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "ATTACH_FILES", "KICK_MEMBERS", "BAN_MEMBERS", "VIEW_CHANNEL"]);
        await msg.say(this.client.translate("commands.invite.response", `${invite ? `<${invite}>` : "Couldn't display the server invite."}`, `${inv ? `<${inv}>` : "Couldn't display the bot invite."}`));
    }
};