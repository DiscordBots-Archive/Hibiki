const Command = require('../../Structures/Command');
const { get } = require('node-superfetch');

module.exports = class Kiss extends Command {
    constructor(client) {
        super(client, {
            name: 'kiss',
            group: 'roleplay',
            memberName: 'kiss',
            description: 'Kiss whoever you want.~ :3',
            examples: ['kiss @User#1234'],
            args: [{
                key: 'user',
                prompt: 'Which user(s) do you want to kiss?~\n',
                type: 'user',
                infinite: true
            }]
        });
    }
    async run(msg, { user }) {
        const users = user ? user.map(u => u.username).join(', ') : user.username;
        const { body } = await get('https://rra.ram.moe/i/r?type=kiss');
        if (users == this.client.user.username) {
            return msg.say('*kisses you back*~ ❤', { files: [{ attachment: `https://rra.ram.moe/${body.path}`, name: `${body.path}` }] });
        }
        if (users == msg.author.username) {
            return msg.say(`I-I'm sorry you're lonely ${user}. *kisses*~ ❤`, { files: [{ attachment: `https://rra.ram.moe/${body.path}`, name: `${body.path}` }] });
        }
        return msg.say(`*${msg.author.toString()} kisses ${users}*~ ❤`, { files: [{ attachment: `https://rra.ram.moe/${body.path}`, name: `${body.path}` }] });
    }
};
