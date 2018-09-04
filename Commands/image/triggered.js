const { Command } = require('discord.js-commando');
const { get } = require('snekfetch');
const Raven = require('raven');

module.exports = class Triggered extends Command {
    constructor(client) {
        super(client, {
            name: 'triggered',
            group: 'image',
            memberName: 'triggered',
            description: 'Responds with a random triggered image.',
            examples: ['triggered']
        });
    }
    
    async run(msg) {
        try {
            const { body } = await get('https://rra.ram.moe/i/r?type=triggered');
            return msg.say({ files: [{ attachment: `https://rra.ram.moe/${body.path}`, name: body.path }] });
        } catch (err) {
            Raven.captureException(err);
            return msg.say(`❎ | This command has errored and the devs have been notified about it. Give <@${this.client.options.owner}> this message: \`${err.message}\``);
        }
    }
};
