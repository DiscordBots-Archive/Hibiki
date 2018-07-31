const { Command } = require('discord.js-commando');
const { get } = require('snekfetch');
const Raven = require('raven');

module.exports = class XKCD extends Command {
    constructor(client) {
        super(client, {
            name: 'xkcd',
            group: 'search',
            memberName: 'xkcd',
            description: 'Responds with a XKCD comic..',
            throttling: {
                usages: 2,
                duration: 3
            },
            args: [{
                key: 'comic',
                prompt: 'What comic ID would you like to search?\n',
                type: 'string'
            }]
        });
    }

    async run(msg, { comic }) {
        try {
            const { body } = await get(`https://xkcd.com/${comic}/info.0.json`);
            return msg.say(`**${body.safe_title}**\n\n${body.transcript}`, { files: [{ attachment: body.img, name: 'comic.png' }] });
        } catch (err) {
            Raven.captureException(err);
            return msg.say(`❎ | This command has been errored and the devs has been notified about it. Give <@${this.client.options.owner}> this message: \`${err.message}\``);
        }
    }
};