const { Command } = require('discord.js-commando');
const { get } = require('snekfetch');
const Raven = require('raven');

module.exports = class TheFloorIsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'floor',
            aliases: ['the-floor-is', 'tfi'],
            group: 'image',
            memberName: 'floor',
            description: 'Sends a \'The floor is x\' meme with your image.',
            throttling: {
                usages: 2,
                duration: 3
            },
            args: [{
                key: 'image',
                prompt: 'Who is the user?\n',
                type: 'user'
            }, {
                key: 'text',
                prompt: 'What would you like the text to be?\n',
                type: 'string'
            }]
        });
    }

    async run(msg, { image, text }) {
        try {
            const { body } = await get('https://api.alexflipnote.xyz/floor')
                .query({
                    image: image.displayAvatarURL(),
                    text
                });
            return msg.say({ files: [{ attachment: body, name: 'floor.png' }] });
        } catch (err) {
            Raven.captureException(err);
            return msg.say(`❎ | This command has errored and the devs have been notified about it. Give <@${this.client.options.owner}> this message: \`${err.message}\``);
        }
    }
};
