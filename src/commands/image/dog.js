const Command = require('../../structures/Command');
const { get } = require('node-superfetch');
 

module.exports = class Dog extends Command {
    constructor(client) {
        super(client, {
            name: 'dog',
            aliases: ['puppy'],
            group: 'image',
            memberName: 'dog',
            description: 'Responds with a random dog.'
        });
    }

    async run(msg) {
        try {
            const { body } = await get('https://random.dog/woof.json');
            return msg.say({ files: [body.url] });
        } catch (err) {
            this.captureError(err);
             
        }
    }
};
