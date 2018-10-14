const Command = require('../../structures/Command');
const { get } = require('node-superfetch');

module.exports = class Lolice extends Command {
    constructor(client) {
        super(client, {
            name: 'lolice',
            group: 'image-edit',
            memberName: 'lolice',
            description: 'Responds with a lolice image with your avatar.',
            throttling: {
                usages: 2,
                duration: 3
            },
            args: [{
                key: 'image',
                prompt: 'Who do you want to arrest for lolis?\n',
                type: 'image|avatar',
            }]
        });
    }

    async run(msg, { image }) {
        const { body } = await get('https://nekobot.xyz/api/imagegen?type=lolice')
            .query({ url: image });
        try {
            return msg.say({ files: [{ attachment: body.message, name: 'lolice.png' }] });
        } catch (err) {
            this.captureError(err);
             
        }
    }
};
