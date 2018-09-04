const { Command } = require('discord.js-commando');
const { get } = require('snekfetch');
const Raven = require('raven');

module.exports = class YoMomma extends Command {
    constructor(client) {
        super(client, {
            name: 'yo-momma',
            aliases: ['yo-mama'],
            group: 'fun',
            memberName: 'yo-momma',
            description: 'Responds with a random yo mama/momma joke.'
        });
    }

    async run(msg) {
        const { body } = await get('http://api.yomomma.info')
            .then(data => JSON.parse(data.text));
        try {
            return msg.say(body.joke);
        } catch (err) {
            Raven.captureException(err);
            return msg.say(`❎ | This command has errored and the devs have been notified about it. Give <@${this.client.options.owner}> this message: \`${err.message}\``);
        }
    }
};
