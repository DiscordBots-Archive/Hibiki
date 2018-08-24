const { Command } = require('discord.js-commando');

module.exports = class Starboard extends Command {
    constructor(client) {
        super(client, {
            name: 'starboard',
            group: 'settings',
            memberName: 'starboard',
            description: 'Sets a starboard channel for this server.',
            guildOnly: true,
            args: [{
                key: 'channel',
                prompt: 'What channel do you want to set as starboard?\n',
                type: 'channel'
            }]
        });
    }
    hasPermission(msg) {
        return this.client.isOwner(msg.author) || this.client.modules.IsStaff(msg.member);
    }
    run(msg, { channel }) {
        msg.guild.settings.set('starboard', channel.id);
        return msg.say(`✅ | Succesfully set starboard channel to <#${channel.id}> (\`${channel.name}\`) in this server.`);
    }
};
