const Command = require('../../Structures/Command');
const { get } = require('snekfetch');

module.exports = class Smug extends Command {
    constructor(client) {
        super(client, {
            name: 'smug',
            group: 'roleplay',
            memberName: 'smug',
            description: 'Smug whoever you want.~ :3',
            examples: ['smug @User#1234'],
            args: [{
                key: 'user',
                prompt: 'Which user do you want to smug?~\n',
                type: 'user'
            }]
        });
    }
    async run(msg, { user }) {
        const { body } = await get('https://rra.ram.moe/i/r?type=smug');
        if (user == this.client.user) {
            return msg.say('*smugs you back*~ ❤', { files: [{ attachment: `https://rra.ram.moe/${body.path}`, name: `${body.path}` }] });
        }
        if (user == msg.author) {
            return msg.say(`I-I'm sorry you're lonely ${user}. *smugs*~ ❤`, { files: [{ attachment: `https://rra.ram.moe/${body.path}`, name: `${body.path}` }] });
        }
        return msg.say(`*${msg.author.toString()} smugs ${user}*~ ❤`, { files: [{ attachment: `https://rra.ram.moe/${body.path}`, name: `${body.path}` }] });
    }
};
