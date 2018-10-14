const Command = require('../../structures/Command');
const { get } = require('node-superfetch');
 

module.exports = class CowSay extends Command {
    constructor(client) {
        super(client, {
            name: 'cow-say',
            aliases: ['cow'],
            group: 'text-edit',
            memberName: 'cow-say',
            description: 'Responds with a cow saying your text.',
            args: [{
                key: 'text',
                prompt: 'What text would you like the cow to say?',
                type: 'string',
                max: 1500
            }]
        });
    }

    async run(msg, { text }) {
        try {
            const { body } = await get('http://cowsay.morecode.org/say')
                .query({
                    message: text,
                    format: 'json'
                });
            return msg.code(null, body.cow);
        } catch (err) {
            this.captureError(err);
             
        }
    }
};
