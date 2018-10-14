const Command = require('../../structures/Command');
const { get } = require('node-superfetch');

module.exports = class Kidnap extends Command {
    constructor(client) {
        super(client, {
            name: 'kidnap',
            group: 'image-edit',
            memberName: 'kidnap',
            description: 'Kidnaps a user, edits the image avatar to the providen user.',
            throttling: {
                usages: 2,
                duration: 3
            },
            args: [{
                key: 'image',
                prompt: 'Which user do you want to kidnap?\n',
                type: 'image|avatar',
            }]
        });
    }

    async run(msg, { image }) {
        const { body } = await get('https://nekobot.xyz/api/imagegen?type=kidnap')
            .query({ image });
        try {
            return msg.say({ files: [{ attachment: body.message, name: 'kidnap.png' }] });
        } catch (err) {
            this.captureError(err);
             
        }
    }
};
