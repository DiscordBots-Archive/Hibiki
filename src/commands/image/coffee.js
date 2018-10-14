const Command = require('../../structures/Command');
const { get } = require('node-superfetch');

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
            this.captureError(err);
             
        }
    }
};
