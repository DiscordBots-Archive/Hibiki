const { Command } = require('discord.js-commando');
const { get } = require('snekfetch');
const Raven = require('raven');

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
            Raven.captureException(err);
            return msg.say(`❎ | This command has been errored and the devs has been notified about it. Give <@${this.client.options.owner}> this message: \`${err.message}\``);
        }
    }
};
