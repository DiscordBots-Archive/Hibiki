const Command = require('../../Structures/Command');
const Strikes = require('../../Models/Strikes');
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
        if (!modlog) return;

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

        return msg.reply(`you've successfully added a strike to ${member.displayName}.`);

        const embed = new MessageEmbed()
            .setColor(0xFFFF00)
            .setDescription(stripIndents`
                ⚠ | Case **${strike.strikeID}** | **User striked**: ${member}
                **Issuer**: ${msg.author.tag}
                **Reason**: ${message || 'No reason'}`);
        await modlog.send({ embed });

        try {
            member.send({
                embed: {
                    color: 0xFF0000,
                    title: '⚠ Uh oh!',
                    description: `You've just been strike in **${msg.guild.name}** with ${message == null ? 'no reason' : `reason: **${message}**`}`,
                    footer: {
                        text: `You now have ${msg.guild.members.size} members.`,
                    },
                },
            });
        } catch (_) {
            // Ignore
        }
    }
};
