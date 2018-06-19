const { Command } = require('discord.js-commando');
const { get } = require('snekfetch');

module.exports = class Duck extends Command {
    constructor(client) {
        super(client, {
            name: 'duck',
            aliases: ['ducc'],
            group: 'image',
            memberName: 'duck',
            description: 'Responds with a random duck.'
        });
    }

    async run(msg) {
        try {
            const { body } = await get('https://api.random-d.uk/random');
            return msg.say({ files: [{ attachment: body.url, name: 'duck.png' }] });
        } catch (err) {
            return msg.say(this.client.translate('commands.error'), err.message);
        }
    }
};
