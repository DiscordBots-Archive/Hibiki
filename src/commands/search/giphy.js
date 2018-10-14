const Command = require('../../structures/Command');
const { get } = require('node-superfetch');
 
module.exports = class Giphy extends Command {
    constructor(client) {
        super(client, {
            name: 'giphy',
            aliases: ['gif'],
            group: 'search',
            memberName: 'giphy',
            description: 'Responds with a GIF image you provided.',
            throttling: {
                usages: 2,
                duration: 3
            },
            args: [{
                key: 'query',
                prompt: 'What would you like to search?\n',
                type: 'string'
            }]
        });
    }

    async run(msg, { query }) {
        try {
            const { body } = await get(`http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${encodeURIComponent(query)}`);
            return msg.say({ files: [{ attachment: body.data.image_url, name: 'image.gif' }] });
        } catch (err) {
            this.captureError(err);
             
        }
    }
};