const Command = require('../../structures/Command');
const { get } = require('node-superfetch');

module.exports = class Smug extends Command {
    constructor(client) {
        super(client, {
            name: 'smug',
            group: 'roleplay',
            memberName: 'smug',
            description: 'Smug yourself.~ :3'
        });
    }
    async run(msg) {
        const { body } = await get('https://rra.ram.moe/i/r?type=smug');
        return msg.say(`*${msg.author.toString()} smugs*~`, { files: [{ attachment: `https://rra.ram.moe/${body.path}`, name: `${body.path}` }] });
    }
};
