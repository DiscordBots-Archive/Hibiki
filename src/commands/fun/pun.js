const Command = require('../../structures/Command');
const { get } = require('node-superfetch');
 

module.exports = class Pun extends Command {
    constructor(client) {
        super(client, {
            name: 'pun',
            group: 'fun',
            memberName: 'pun',
            description: 'Responds with a random pun.'
        });
    }

    async run(msg) {
        const { body } = await get('https://getpuns.herokuapp.com/api/random');
        try {
            return msg.say(JSON.parse(body).Pun);
        } catch (err) {
            this.captureError(err);
             
        }
    }
};
