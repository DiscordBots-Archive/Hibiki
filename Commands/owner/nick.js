const { Command } = require('discord.js-commando');

module.exports = class Nick extends Command {
    constructor(client) {
        super(client, {
            name: 'nick',
            aliases: ['nickname'],
            group: 'owner',
            memberName: 'nick',
            description: 'Changes my nickname on this server.',
            details: 'Only the bot owner(s) or admins can use this command.',
            examples: ['nick <nickname>'],
            args: [{
                key: 'nick',
                prompt: 'What would you like me to be nicknamed?\n',
                type: 'string'
            }]
        });
    }

    hasPermission(msg) {
        if (this.client.isOwner(msg.author) || msg.member.permissions.has('MANAGE_NICKNAMES')) return true;
        return 'Only owner(s) or admin(s) can do that.';
    }

    async run(msg, { nick }) {
        if (nick.length > 32) return msg.say('❎ | Too long nickname.');
        await msg.guild.me.setNickname(nick);
        await msg.say(`✅ | Succesfully set my nickname to \`${nick}\`.`);
    }
};