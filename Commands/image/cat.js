const { Command } = require('discord.js-commando');
const { get } = require('snekfetch');
const { catKey } = require('../../Config');
const Raven = require('raven');

module.exports = class Cat extends Command {
    constructor(client) {
        super(client, {
            name: 'cat',
            aliases: ['kitty'],
            group: 'image',
            memberName: 'cat',
            description: 'Responds with a random kitty.'
        });
    }

    async run(msg) {
        try {
            const { body, headers } = await get('https://thecatapi.com/api/images/get')
                .query({ api_key: catKey });
            const format = headers['content-type'].replace(/image\//i, '');
            return msg.say({ files: [{ attachment: body, name: `cat.${format}` }] });
        } catch (err) {
            Raven.captureException(err);
            await msg.say(`❎ | This command has errored and the devs have been notified about it. Give <@${this.client.options.owner}> this message: \`${err.message}\``);
        }
    }
};
