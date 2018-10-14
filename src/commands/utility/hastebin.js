const Command = require('../../structures/Command');

module.exports = class Hastebin extends Command {
    constructor(client) {
        super(client, {
            name: 'hastebin',
            aliases: ['hb', 'haste'],
            group: 'utility',
            memberName: 'hastebin',
            description: 'Uploads a text to Hastebin.',
            args: [{
                key: 'code',
                prompt: 'What code would you like to upload to Hastebin?',
                type: 'code'
            }]
        });
    }

    async run(msg, { code }) {
        try {
            const result = await this.client.modules.upload.haste(code);
            return msg.say(result);
        } catch (err) {
            this.captureError(err);
             
        }
    }
};
