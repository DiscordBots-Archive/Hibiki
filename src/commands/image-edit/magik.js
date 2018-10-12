const Command = require('../../structures/Command');
const { get } = require('node-superfetch');

module.exports = class Magik extends Command {
    constructor(client) {
        super(client, {
            name: 'magik',
            group: 'image-edit',
            memberName: 'magik',
            description: 'Adds a "magik" effect to the specified image.',
            throttling: {
                usages: 2,
                duration: 3
            },
            args: [{
                key: 'image',
                prompt: 'Which image/avatar do you want to magik-ify?\n',
                type: 'image|avatar',
            }]
        });
    }

    async run(msg, { image }) {
        const { body } = await get('https://nekobot.xyz/api/imagegen?type=magik')
            .query({ image });
        try {
            return msg.say({ files: [{ attachment: body.message, name: 'magik.png' }] });
        } catch (err) {
            this.captureError(err);
            return msg.say(`❎ | This command has errored and the devs have been notified about it. Give <@${this.client.options.owner}> this message: \`${err.message}\``);
        }
    }
};
