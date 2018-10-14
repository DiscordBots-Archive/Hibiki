const Command = require('../../structures/Command');
const { get } = require('node-superfetch');
 

module.exports = class FML extends Command {
    constructor(client) {
        super(client, {
            name: 'fml',
            aliases: ['fuck-my-life'],
            group: 'fun',
            memberName: 'fml',
            description: 'Responds with a fml story.'
        });
    }

    async run(msg) {
        const { body } = await get('https://api.alexflipnote.xyz/fml');
        try {
            return msg.say(body.text);
        } catch (err) {
            this.captureError(err);
             
        }
    }
};
