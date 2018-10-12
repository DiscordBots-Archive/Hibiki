const Command = require('../../structures/Command');
const { get } = require('node-superfetch');

module.exports = class Lewd extends Command {
    constructor(client) {
        super(client, {
            name: 'lewd',
            group: 'roleplay',
            memberName: 'lewd',
            description: 'Gives a random LEWD! image.',
            examples: ['lewd']
        });
    }
    
    async run(msg) {
        try {
            const { body } = await get('https://rra.ram.moe/i/r?type=lewd');
            if (body.nsfw && !msg.channel.nsfw) {
                return msg.say('Sorry, this image is NSFW and I cannot show you it on a non-NSFW channel.');
            }
            return msg.say({ files: [{ attachment: `https://rra.ram.moe/${body.path}`, name: body.path }] });
        } catch (err) {
            this.captureError(err);
            return msg.say(`❎ | This command has errored and the devs have been notified about it. Give <@${this.client.options.owner}> this message: \`${err.message}\``);
        }
    }
};
