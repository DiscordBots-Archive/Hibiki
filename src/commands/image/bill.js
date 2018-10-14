const Command = require('../../structures/Command');
const { get } = require('node-superfetch');
 

module.exports = class Bill extends Command {
    constructor(client) {
        super(client, {
            name: 'bill',
            group: 'image',
            memberName: 'bill',
            description: 'Responds with a random Be like Bill image.',
            examples: ['bill']
        });
    }

    async run(msg) {
        const { body } = await get('http://belikebill.azurewebsites.net/billgen-API.php?default=1');
        try {
            return msg.say({ files: [{ attachment: body, name: 'bill.png' }] });
        } catch (err) {
            this.captureError(err);
             
        }
    }
};
