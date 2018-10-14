const Command = require('../../structures/Command');
const { get } = require('node-superfetch');
const { CAT_KEY } = process.env;

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
                .query({ api_key: CAT_KEY });
            const format = headers['content-type'].replace(/image\//i, '');
            return msg.say({ files: [{ attachment: body, name: `cat.${format}` }] });
        } catch (err) {
            this.captureError(err);
             
        }
    }
};
