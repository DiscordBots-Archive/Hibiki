const Command = require('../../Structures/Command');
const { invite } = require('../../Config/');

module.exports = class Invite extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            aliases: ['add', 'join'],
            group: 'information',
            memberName: 'info',
            description: 'Gives you the useful invite links about this bot.'
        });
    }

    async run (msg) {
        const inv = await this.client.generateInvite(['MANAGE_GUILD', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'ATTACH_FILES', 'KICK_MEMBERS', 'BAN_MEMBERS', 'VIEW_CHANNEL']);
        await msg.say(`**Server invite**: ${invite ? invite : 'No server invite set.'}\n**Bot Invite**: ${inv ? inv : 'Couldn\'t display server invite.'}`);
    }
};