const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');
const { MessageEmbed } = require('discord.js');
 
module.exports = class Ban extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            aliases: ['ban-hammer', 'banne'],
            group: 'moderation',
            memberName: 'ban',
            description: 'Bans a user when executed.',
            examples: ['ban @User#1234'],
            guildOnly: true,
            args: [{
                key: 'member',
                prompt: 'Which user do you want to ban?\n',
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
        if (!msg.guild.me.permissions.has('BAN_MEMBERS')) return msg.say('Sorry, I don\'t have permissions to ban people.');
        const modlog = await msg.guild.channels.get(msg.guild.settings.get('modLog'));
        try {
            const embed = new MessageEmbed()
                .setTitle('🕥 Waiting for response...')
                .setColor(0xffff00)
                .setDescription(`Do you really want to ban **${member}**?`)
                .setFooter('Respond with yes or no.');
            const resp = await this.client.modules.AwaitReply(msg, msg.author, embed, 30000);
            if (['y', 'yes'].includes(resp.toLowerCase())) {
                const embed = new MessageEmbed()
                    .setColor(0xff0000)
                    .setDescription(stripIndents`
                        🔨 | **User banned**: ${member}
                        **Issuer**: ${msg.author.tag}
                        **Reason**: ${reason || 'No reason'}
                    `);
                member.ban({ reason });
                if (modlog) {
                    return modlog.send({ embed });
                }
                msg.react('✅');
            } else if (['n', 'no', 'cancel'].includes(resp.toLowerCase())) {
                const embed = new MessageEmbed()
                    .setTitle('😌 Phew..')
                    .setColor(0x00ff00)
                    .setDescription('The user hasn\'t been banned.');
                await msg.embed(embed);
            }
        } catch (err) {
            this.captureError(err);
            await this.client.logger.error(err.stack);
            return msg.say(`❎ | This command has errored and the devs have been notified about it. Give <@${this.client.options.owner}> this message: \`${err.message}\``);
        }
    }
};