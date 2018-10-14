const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

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
                key: 'ids',
                prompt: 'Which IDs do you want to hackban?\n',
                type: 'string',
                infinite: true
            }]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.permissions.has('BAN_MEMBERS');
    }

    async run(msg, { ids } ) {
        if (!msg.guild.me.permissions.has('BAN_MEMBERS')) return msg.say('Sorry, I don\'t have permissions to ban people.');
        const modlog = await msg.guild.channels.get(msg.guild.settings.get('modLog'));
        if (!modlog) return;
        try {
            const embed = new MessageEmbed()
                .setTitle('🕥 Waiting for response...')
                .setColor(0xffff00)
                .setDescription(`Do you really want to hackban **${ids}**?`)
                .setFooter('Respond with yes or no.');
            const resp = await this.client.modules.awaitReply(msg, msg.author, embed, 30000);
            if (['y', 'yes'].includes(resp.toLowerCase())) {
                for (let users of ids) { 
                    const embed = new MessageEmbed()
                        .setColor(0xff0000)
                        .setDescription(stripIndents`
                        🔨 | **${users.length} ${users.length == 1 ? 'User' : 'Users'} hackbanned**: ${users}
                        **Issuer**: ${msg.author.tag}
                        `);
                    await msg.guild.members.ban(users, { reason: 'Hackban' });
                    await modlog.send({ embed });
                    await msg.react('✅');
                }
            } else if (['n', 'no', 'cancel'].includes(resp.toLowerCase())) {
                return msg.say('Cancelled the ban.');
            }
        } catch (err) {
            this.captureError(err);
            await this.client.logger.error(err.stack);
             
        }
    }
};