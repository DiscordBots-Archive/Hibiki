const { Command } = require("discord.js-commando");

module.exports = class AutoRole extends Command {
    constructor(client) {
        super(client, {
            name: "auto-role",
            aliases: ["join-role"],
            group: "settings",
            memberName: "auto-role",
            description: "Sets an role where new members instantly get the role.",
            guildOnly: true,
            args: [{
                key: "role",
                prompt: "What would be the role for new members?\n",
                type: "role"
            }]
        });
    }
    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.permissions.has("MANAGE_SERVER");
    }

    run(msg, { role }) {
        msg.guild.settings.set("autoRole", role.id);
        return msg.say(this.client.translate("commands.config.response", "auto role", `${role.name} (${role.id})`));
    }
};
