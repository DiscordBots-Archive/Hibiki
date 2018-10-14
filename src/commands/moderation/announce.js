const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class Announce extends Command {
    constructor(client) {
        super(client, {
            name: 'announce',
            aliases: ['announcement'],
            group: 'moderation',
            memberName: 'announce',
            description: 'Sends an announcement on the announcement(s) channel.',
            examples: ['announce Hello!'],
            args: [{
                key: 'text',
                prompt: 'What would you like to announce?\n',
                type: 'string'
            }]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.permissions.has('MANAGE_MESSAGES');
    }

    async run(msg, { text }) {
        const channel = this.client.channels.get(msg.guild.settings.get('announceChannel'));
        if (!channel) return msg.say(`No announcement channel set. Type \`${msg.guild.commandPrefix} announce-channel #channel\` to set it.`);
        try {
            const embed = new MessageEmbed()
                .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                .setColor(this.groupColor)
                .setDescription(text)
                .setTimestamp(`${new Date().toLocaleString()} | ${this.client.version}`);
            await msg.react('✅');
            return channel.send({ embed });
        } catch (err) {
            this.captureError(err);
            await this.client.logger.error(err.stack);
             
        }
    }
};
