const { Command } = require('discord.js-commando');

module.exports = class AntiInvite extends Command {
    constructor(client) {
        super(client, {
            name: 'anti-invite',
            aliases: ['invite-guard', 'no-invite'],
            group: 'settings',
            memberName: 'anti-invite',
            description: 'Configures anti-invite for this server.',
            guildOnly: true,
        });
    }
    
    hasPermission(msg) {
        return this.client.isOwner(msg.author) || this.client.modules.IsStaff(msg.member);
    }

    run(msg) {
        msg.guild.settings.set('antiInvite', true);
        return msg.say('✅ | Succesfully enabled **anti invite** for this server.');
    }
};