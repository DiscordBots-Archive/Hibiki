const Command = require('../../structures/Command');
const { get } = require('node-superfetch');

module.exports = class TrumpTweet extends Command {
    constructor(client) {
        super(client, {
            name: 'trumptweet',
            aliases: ['trump-tweet'],
            group: 'image-edit',
            memberName: 'trump-tweet',
            description: 'A trump tweet meme, edits the message to your text.',
            throttling: {
                usages: 2,
                duration: 3
            },
            args: [{
                key: 'text',
                prompt: 'What text do you want to add?\n',
                type: 'string',
                max: 60
            }]
        });
    }

    async run(msg, { text }) {
        const { body } = await get('https://nekobot.xyz/api/imagegen?type=trumptweet')
            .query({ text });
        try {
            return msg.say({ files: [{ attachment: body.message, name: 'trumptweet.png' }] });
        } catch (err) {
            this.captureError(err);
            return msg.say(`❎ | This command has errored and the devs have been notified about it. Give <@${this.client.options.owner}> this message: \`${err.message}\``);
        }
    }
};
