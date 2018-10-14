const Command = require('../../structures/Command');
const { get } = require('node-superfetch');
 

module.exports = class Shibe extends Command {
    constructor(client) {
        super(client, {
            name: 'shibe',
            aliases: ['shibe', 'shib'],
            group: 'image',
            memberName: 'shibe',
            description: 'Responds with a random shibe.'
        });
    }

    async run(msg) {
        try {
            const { body } = await get('http://shibe.online/api/shibes?count=1&httpsurls=true');
            return msg.say({ files: [{ attachment: body[0], name: 'shibe.png' }] });
        } catch (err) {
            this.captureError(err);
             
        }
    }
};
