const { Command } = require('discord-akairo');
const Random = require('random-js');

class IQCommand extends Command {
    constructor() {
        super('iq', {
            aliases: ['iq', 'intelligence-quotient'],
            category: 'analyze',
            description: { content: 'Determines a user\'s IQ.' },
            args: [{
                id: 'member',
                type: 'member',
                default: (msg) => msg.member
            }]
        });
    }

    exec(msg, { user }) {
        const random = new Random(Random.engines.mt19937().seed(user.id));
        const score = random.integer(20, 170);
        return msg.util.send(`${user.id === msg.author.id ? 'Your' : `${user.username}'s`} IQ score is ${score}.`);
    }
}

module.exports = IQCommand;