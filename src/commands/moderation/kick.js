const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class Kick extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            aliases: ['kicke'],
            group: 'moderation',
            memberName: 'kick',
            description: 'Kicks a user when executed.',
            examples: ['kick @User#1234'],
            guildOnly: true,
            args: [{
                key: 'member',
                prompt: 'Which user do you want to kick?\n',
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
        return this.client.isOwner(msg.author) || msg.member.permissions.has('KICK_MEMBERS');
    }

    async run(msg, { member, reason } ) {
        const modlog = await msg.guild.channels.get(msg.guild.settings.get('modLog'));
        if (!msg.guild.me.permissions.has('KICK_MEMBERS')) return msg.say('Sorry, I don\'t have permissions to kick people.');
        
        try {
            const embed = new MessageEmbed()
                .setTitle('🕥 Waiting for response...')
                .setColor(0xffff00)
                .setDescription(`Do you really want to kick **${member}**?`)
                .setFooter('Respond with yes or no.');
            const resp = await this.client.modules.AwaitReply(msg, msg.author, embed, 30000);
            if (['y', 'yes'].includes(resp.toLowerCase())) {
                msg.guild.member(member).kick([reason]);
                const embed = new MessageEmbed()
                    .setColor(0xff0000)
                    .setDescription(stripIndents`
                    🔨 | **User banned**: ${member}
                    **Issuer**: ${msg.author.tag}
                    **Reason**: ${reason || 'No reason'}
                `);
                if (modlog) {
                    return modlog.send({ embed });
                }
                msg.react('✅');
            } else if (['n', 'no', 'cancel'].includes(resp.toLowerCase())) {
                const embed = new MessageEmbed()
                    .setTitle('😌 Phew..')
                    .setColor(0xFFFF00)
                    .setDescription('The user hasn\'t been kicked.');
                await msg.embed(embed);
            }
        } catch (err) {
            this.captureError(err);
            await this.client.logger.error(err.stack);
            return msg.say(`❎ | This command has errored and the devs have been notified about it. Give <@${this.client.options.owner}> this message: \`${err.message}\``);
        }
    }
};