const Command = require('../../structures/Command');
const { get } = require('node-superfetch');
 

module.exports = class Clyde extends Command {
    constructor(client) {
        super(client, {
            name: 'clyde',
            group: 'image-edit',
            memberName: 'clyde',
            description: 'Edits Clyde\'s message to your text.',
            throttling: {
                usages: 2,
                duration: 3
            },
            args: [{
                key: 'text',
                prompt: 'What text do you want to add?\n',
                type: 'string',
            }]
        });
    }

    async run(msg, { text }) {
        const { body } = await get('https://nekobot.xyz/api/imagegen?type=clyde')
            .query({ text });
        try {
            return msg.say({ files: [{ attachment: body.message, name: 'clyde.png' }] });
        } catch (err) {
            this.captureError(err);
             
        }
    }
};
