const Command = require('../../structures/Command');
const { get } = require('node-superfetch');

module.exports = class Birb extends Command {
    constructor(client) {
        super(client, {
            name: 'birb',
            group: 'image',
            memberName: 'birb',
            description: 'Responds with a random birb image. 🐦'
        });
    }

    async run(msg) {
        const { body } = await get('https://api.alexflipnote.xyz/birb');
        try {
            return msg.say({ files: [{ attachment: body.file }] });
        } catch (err) {
            this.captureError(err);
            return msg.say(`❎ | This command has errored and the devs have been notified about it. Give <@${this.client.options.owner}> this message: \`${err.message}\``);
        }
    }
};
