const { Command } = require('discord.js-commando');
const { get } = require('snekfetch');
const Raven = require('raven');

module.exports = class Coffee extends Command {
    constructor(client) {
        super(client, {
            name: 'coffee',
            aliases: ['kofi'],
            group: 'image',
            memberName: 'coffee',
            description: 'Responds with a random coffee. ☕'
        });
    }

    async run(msg) {
        const { body } = await get('https://coffee.alexflipnote.xyz/random.json');
        try {
            return msg.say({ files: [{ attachment: body, name: 'coffee.png' }] });
        } catch (err) {
            Raven.captureException(err);
            return msg.say(`❎ | This command has been errored and the devs has been notified about it. Give <@${this.client.options.owner}> this message: \`${err.message}\``);
        }
    }
};
