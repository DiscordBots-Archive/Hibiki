const { Command } = require('discord.js-commando');
const { get } = require('snekfetch');
const Raven = require('raven');

module.exports = class Bill extends Command {
    constructor(client) {
        super(client, {
            name: 'bill',
            group: 'image',
            memberName: 'bill',
            description: 'Responds with a random Be like Bill image.',
            examples: ['bill']
        });
    }

    async run(msg) {
        const { body } = await get('http://belikebill.azurewebsites.net/billgen-API.php?default=1');
        try {
            return msg.say({ files: [{ attachment: body, name: 'bill.png' }] });
        } catch (err) {
            Raven.captureException(err);
            return msg.say(`❎ | This command has been errored and the devs has been notified about it. Give <@${this.client.options.owner}> this message: \`${err.message}\``);
        }
    }
};
