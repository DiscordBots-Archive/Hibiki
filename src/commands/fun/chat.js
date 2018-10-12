const Command = require('../../structures/Command');
const { get } = require('node-superfetch');

module.exports = class Chat extends Command {
    constructor(client) {
        super(client, {
            name: 'chat',
            group: 'fun',
            memberName: 'chat',
            description: 'Chat with the weird API thing.',
            args: [{
                key: 'text',
                prompt: 'What are you gonna ask?',
                type: 'string',
            }]
        });
    }

    async run(msg, { text }) {
        const { body } = await get('https://nekos.life/api/v2/chat')
            .query({ text });
        if (text === 'e') return msg.say('No response');
        return msg.say(body.response);
    }
};