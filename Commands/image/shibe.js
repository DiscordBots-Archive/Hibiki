const { Command } = require('discord.js-commando');
const { get } = require('snekfetch');
const Raven = require('raven');

module.exports = class Shibe extends Command {
    constructor(client) {
        super(client, {
            name: 'shibe',
            aliases: ['shibe', 'shib'],
            group: 'image',
            memberName: 'shibe',
            description: 'Responds with a random shibe.'
        });
    }

    async run(msg) {
        try {
            const { body } = await get('http://shibe.online/api/shibes?count=1&httpsurls=true');
            return msg.say({ files: [{ attachment: body[0], name: 'shibe.png' }] });
        } catch (err) {
            Raven.captureException(err);
            return msg.say(`❎ | This command has errored and the devs have been notified about it. Give <@${this.client.options.owner}> this message: \`${err.message}\``);
        }
    }
};
