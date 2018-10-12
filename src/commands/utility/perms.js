const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');
const { MessageEmbed } = require('discord.js');

module.exports = class PermsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'perms',
            aliases: ['permissions'],
            group: 'utility',
            memberName: 'perms',
            description: 'See the list of the bot\'s required permissions.',
            guildOnly: true
        });
    }

    async run(msg) {
        const permCheck = (perm) => msg.guild.me.permissions.has(perm);
        const embed = new MessageEmbed()
            .setColor(this.groupColor)
            .setDescription(stripIndents`
                **🔧 Manage**
                Manage Roles: ${permCheck('MANAGE_ROLES') ? 'Yes' : 'No'}
                Manage Messages: ${permCheck('MANAGE_MESSAGES') ? 'Yes' : 'No'}

                **🔨 Moderation**
                Kick Members: ${permCheck('KICK_MEMBERS') ? 'Yes': 'No'}
                Ban Members: ${permCheck('BAN_MEMBERS') ? 'Yes': 'No'}
            `);
        return msg.embed(embed);
    }
};