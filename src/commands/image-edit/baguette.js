const Command = require('../../structures/Command');
const { get } = require('node-superfetch');

module.exports = class Baguette extends Command {
    constructor(client) {
        super(client, {
            name: 'baguette',
            group: 'image-edit',
            memberName: 'baguette',
            description: 'Baguettes your image.',
            throttling: {
                usages: 2,
                duration: 3
            },
            args: [{
                key: 'image',
                prompt: 'Who do you want to baguette?\n',
                type: 'image|avatar',
            }]
        });
    }

    async run(msg, { image }) {
        const { body } = await get('https://nekobot.xyz/api/imagegen?type=baguette')
            .query({ url: image });
        try {
            return msg.say({ files: [{ attachment: body.message, name: 'baguette.png' }] });
        } catch (err) {
            this.captureError(err);
             
        }
    }
};