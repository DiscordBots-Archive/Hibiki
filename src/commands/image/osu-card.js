const Command = require('../../structures/Command');
const { OSU_KEY } = process.env;
const { get } = require('node-superfetch');

module.exports = class OSUCard extends Command {
    constructor(client) {
        super(client, {
            name: 'osu-card',
            aliases: ['osucard'],
            group: 'image',
            memberName: 'osu-card',
            description: 'Responds with an osu! card image with the providen username.',
            throttling: {
                usages: 2,
                duration: 3
            },
            args: [{
                key: 'user',
                prompt: 'Who is the osu! user?\n',
                type: 'string',
            }]
        });
    }

    async run(msg, { user }) {
        const { body } = await get('https://nekobot.xyz/api/imagegen?type=osu')
            .query({ key: OSU_KEY, username: user });
        try {
            return msg.say({ files: [{ attachment: body.message, name: 'osu.png' }] });
        } catch (err) {
            this.captureError(err);
             
        }
    }
};
