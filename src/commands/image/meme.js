const Command = require('../../structures/Command');
const { get } = require('node-superfetch');
 

module.exports = class Meme extends Command {
    constructor(client) {
        super(client, {
            name: 'meme',
            aliases: ['memes'],
            group: 'image',
            memberName: 'meme',
            description: 'Responds with a random meme.',
            throttling: {
                usages: 2,
                duration: 3
            }
        });
    }

    async run(msg) {
        try {
            const { body } = await get('https://api.alexflipnote.xyz/memes');
            return msg.say({ files: [{ attachment: body.file, name: 'meme.png' }] });
        } catch (err) {
            this.captureError(err);
             
        }
    }
};
