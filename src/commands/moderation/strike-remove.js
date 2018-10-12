const Command = require('../../structures/Command');
const Strikes = require('../../models/Strikes');

module.exports = class MeritRemoveCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'strike-remove',
            aliases: ['remove-strike', 'strike-rem', 'rem-strike', 'rmstrike', 'delstrike', 'unstrike'],
            group: 'reputation',
            memberName: 'strike-remove',
            description: 'Removes an strike from a user.',
            guildOnly: true,

            args: [{
                key: 'strike',
                prompt: 'Which strike ID would you like to remove?\n',
                type: 'string',
                infinite: true
            }]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.permissions.has('MANAGE_MESSAGES');
    }

    async run(msg, { strike }) {
        try {
            for (let i of strike) {
                await Strikes.destroy({ where: { strikeID: i, guildID: msg.guild.id } });
            }
            return msg.reply(`Removed the ${strike.length} ${strike.length == 1 ? 'strike' : 'strikes'}.`);
        } catch (err) {
            return this.client.logger.error(err);
        }
    }
};
