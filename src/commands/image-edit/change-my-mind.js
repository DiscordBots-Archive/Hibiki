const Command = require('../../structures/Command');
const { get } = require('node-superfetch');
 

module.exports = class ChangeMyMind extends Command {
    constructor(client) {
        super(client, {
            name: 'change-my-mind',
            aliases: ['changemymind'],
            group: 'image-edit',
            memberName: 'change-my-mind',
            description: 'A change my mind meme, edits the message to your text.',
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
        const { body } = await get('https://nekobot.xyz/api/imagegen?type=changemymind')
            .query({ text });
        try {
            return msg.say({ files: [{ attachment: body.message, name: 'changemymind.png' }] });
        } catch (err) {
            this.captureError(err);
             
        }
    }
};
