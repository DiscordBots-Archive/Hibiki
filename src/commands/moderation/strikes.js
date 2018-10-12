const Command = require('../../structures/Command');
const Strikes = require('../../models/Strikes');

module.exports = class StrikesCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'strikes',
            aliases: ['show-strikes', 'strike-list'],
            group: 'moderation',
            memberName: 'strikes',
            description: 'Display the strikes from a user who has received it from staff.',
            guildOnly: true,
            args: [{
                key: 'user',
                prompt: 'whom strikes do you want to view?',
                type: 'user',
                default: msg => msg.author
            }]
        });
    }

    async run(msg, { user }) {
        const strikes = await Strikes.findAll({ where: { guildID: msg.guild.id, userID: user.id } });

        if (!strikes.length) {
            return msg.embed({
                color: 0xE93F3C,
                author: {
                    name: `${user.tag} (${user.id})`,
                    icon_url: user.displayAvatarURL({ format: 'png' })
                },
                description: 'You have 0 strikes!'
            });
        }
        return msg.embed({
            color: 0xE93F3C,
            author: {
                name: `${user.tag} (${user.id})`,
                icon_url: user.displayAvatarURL({ format: 'png' }) // eslint-disable-line camelcase
            },
            fields: strikes.map(s => ({
                name: s.strikeID,
                value: `${s.strikeMessage} **by ${this.client.users.get(s.strikeBy).tag}**`
            }))
        });
    }
};
