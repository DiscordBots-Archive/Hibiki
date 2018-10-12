const Command = require('../../structures/Command');
const Strikes = require('../../models/Strikes');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const random = require('randomstring');

module.exports = class StrikeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'strike',
            group: 'moderation',
            memberName: 'strike',
            description: 'Add a strike to a user.',
            guildOnly: true,
            args: [{
                key: 'member',
                prompt: 'whom would you like to give a strike?',
                type: 'member'
            }, {
                key: 'message',
                prompt: 'add a message.',
                type: 'string',
                max: 200,
                default: ''
            }]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.permissions.has('MANAGE_MESSAGES');
    }

    async run(msg, { member, message }) {
        const modlog = await msg.guild.channels.get(msg.guild.settings.get('modLog'));

        const strike = await Strikes.create({
            strikeID: random.generate({
                length: 6,
                charset: 'alphabetic'
            }),
            userID: member.id,
            guildID: msg.guild.id,
            strikeBy: msg.author.id,
            strikeMessage: message || null
        });

        msg.reply(`you've successfully added a strike to ${member.displayName}.`);

        if (modlog) {
            const embed = new MessageEmbed()
                .setColor(0xFFFF00)
                .setDescription(stripIndents`
                    ⚠ | ID **${strike.strikeID}** | **User striked**: ${member}
                    **Issuer**: ${msg.author.tag}
                    **Reason**: ${message || 'No reason'}`);
            await modlog.send({ embed });
        }

        try {
            const strikes = await Strikes.findAll({ where: { guildID: msg.guild.id, userID: member.id } });
            member.send({
                embed: {
                    color: 0xFF0000,
                    title: '⚠ Uh oh!',
                    description: `You've just been striked in **${msg.guild.name}** ${message ? `for ${message}.` : 'for no reason.'}`,
                    footer: {
                        text: `You now have ${strikes.length} strikes.`,
                    },
                },
            });
        } catch (_) {
            // Ignore
        }
    }
};
