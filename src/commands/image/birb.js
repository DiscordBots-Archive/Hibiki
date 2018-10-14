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
             
        }
    }
};
