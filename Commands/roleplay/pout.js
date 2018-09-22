const Command = require('../../Structures/Command');
const { get } = require('snekfetch');

module.exports = class Pout extends Command {
    constructor(client) {
        super(client, {
            name: 'pout',
            group: 'roleplay',
            memberName: 'pout',
            description: 'Pout whoever you want.~ 👀',
            examples: ['pout @User#1234'],
            args: [{
                key: 'user',
                prompt: 'Which user do you want to pout? 👀\n',
                type: 'user'
            }]
        });
    }
    async run(msg, { user }) {
        const { body } = await get('https://rra.ram.moe/i/r?type=pout');
        if (user == this.client.user) {
            return msg.say('*pouts you back*~ 👀', { files: [{ attachment: `https://rra.ram.moe/${body.path}`, name: `${body.path}` }] });
        }
        if (user == msg.author) {
            return msg.say(`I-I'm sorry you're lonely ${user}. *pouts*~ 👀`, { files: [{ attachment: `https://rra.ram.moe/${body.path}`, name: `${body.path}` }] });
        }
        return msg.say(`*${msg.author.toString()} pouts ${user}*~ 👀`, { files: [{ attachment: `https://rra.ram.moe/${body.path}`, name: `${body.path}` }] });
    }
};
