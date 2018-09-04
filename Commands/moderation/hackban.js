const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const Raven = require('raven');

module.exports = class Hackban extends Command {
    constructor(client) {
        super(client, {
            name: 'hackban',
            group: 'moderation',
            memberName: 'hackban',
            description: 'Hackbans a user when executed.',
            examples: ['hackban 334254548841398275'],
            guildOnly: true,
            args: [{
                key: 'id',
                prompt: 'Which user do you want to hackban?\n',
                type: 'user'
            }, {
                key: 'reason',
                prompt: 'What is the reason?\n',
                type: 'string'
            }]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.permissions.has('BAN_MEMBERS');
    }

    async run(msg, { id, reason } ) {
        const user = this.client.users.get(id);
        if (!msg.guild.me.permissions.has('BAN_MEMBERS')) 
            return msg.say('Sorry, I don\'t have permissions to ban people.');
        const modlog = await msg.guild.channels.get(msg.guild.settings.get('modLog'));
        if (!modlog) 
            return msg.say(`No moderation log channel set. Type \`${msg.guild.commandPrefix} mod-log #channel\` to set it.`);
        try {
            const resp = await this.client.modules.AwaitReply(msg, `Do you really want to hackban **${id}**?\nRespond with "yes" or "no".`, 30000);
            if (['y', 'yes'].includes(resp.toLowerCase())) {
                const embed = new MessageEmbed()
                    .setColor(0xff0000)
                    .setDescription(`🔨 | **User hackbanned**: ${user ? user.tag : `I was unable to display the user... (${id})`}\n**Issuer**: ${msg.author.tag}\n**Reason**: ${reason}`);
                await msg.guild.members.ban(id, { reason });
                await modlog.send({ embed });
                await msg.react('✅');
            } else if (['n', 'no', 'cancel'].includes(resp.toLowerCase())) {
                return msg.say('Cancelled the ban.');
            }
        } catch (err) {
            Raven.captureException(err);
            await this.client.logger.error(err.stack);
            return msg.say(`❎ | This command has errored and the devs have been notified about it. Give <@${this.client.options.owner}> this message: \`${err.message}\``);
        }
    }
};