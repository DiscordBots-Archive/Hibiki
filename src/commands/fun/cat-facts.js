const Command = require('../../structures/Command');
const { get } = require('node-superfetch');
 

module.exports = class CatFacts extends Command {
    constructor(client) {
        super(client, {
            name: 'cat-facts',
            aliases: ['cat-fact', 'kitten-fact'],
            group: 'fun',
            memberName: 'cat-facts',
            description: 'Responds with a random cat/kitten fact.'
        });
    }

    async run(msg) {
        const { body } = await get('https://catfact.ninja/fact');
        try {
            return msg.say(body.fact);
        } catch (err) {
            this.captureError(err);
             
        }
    }
};
