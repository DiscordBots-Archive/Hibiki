const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class Softban extends Command {
    constructor(client) {
        super(client, {
            name: 'softban',
            aliases: ['softbanne'],
            group: 'moderation',
            memberName: 'softban',
            description: 'Softbans a user when executed.',
            examples: ['softban @User#1234'],
            guildOnly: true,
            args: [{
                key: 'member',
                prompt: 'Which user do you want to softban?\n',
                type: 'member'
            }, {
                key: 'reason',
                prompt: 'What is the reason?\n',
                type: 'string',
                default: ''
            }]
        });
    }
        
    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.permissions.has('BAN_MEMBERS');
    }

    async run(msg, { member, reason } ) {
        const modlog = await msg.guild.channels.get(msg.guild.settings.get('modLog'));
        if (!msg.guild.me.permissions.has('BAN_MEMBERS')) return msg.say('Sorry, I don\'t have permissions to ban people.');
        if (!modlog) return;
        try {
            const embed = new MessageEmbed()
                .setTitle('🕥 Waiting for response...')
                .setColor(0xffff00)
                .setDescription(`Do you really want to softban **${member}**?`)
                .setFooter('Respond with yes or no.');
            const resp = await this.client.modules.awaitReply(msg, msg.author, embed, 30000);
            if (['y', 'yes'].includes(resp.toLowerCase())) {
                const embed = new MessageEmbed()
                    .setColor(0xFFFF00)
                    .setDescription(stripIndents`
                        🔨 | **User softbanned**: ${member}
                        **Issuer**: ${msg.author.tag}
                        **Reason**: ${reason || 'No reason'}`);
                if (modlog) {
                    await modlog.send({ embed });
                }
                await member.ban({ days: 0, reason });
                await msg.guild.members.unban(member.id);
                await msg.react('✅');
            } else if (['n', 'no', 'cancel'].includes(resp.toLowerCase())) {
                return msg.say('Cancelled the ban.');
            }
        } catch (err) {
            this.captureError(err);
            await this.client.logger.error(err.stack);
             
        }
    }
};