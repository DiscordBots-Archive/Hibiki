const Command = require('../../Structures/Command');
const Random = require('random-js');
const texts = require('../../Assets/json/coolness');

module.exports = class CoolnessCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'coolness',
            group: 'analyze',
            memberName: 'coolness',
            description: 'Determines a user\'s coolness.',
            args: [{
                key: 'user',
                prompt: 'Which user do you want to determine the coolness of?',
                type: 'user',
                default: msg => msg.author
            }]
        });
    }

    run(msg, { user }) {
        const authorUser = user.id === msg.author.id;
        if (user.id === this.client.user.id) 
            return msg.say('Why would you ask? Of course I\'m the very best bot, like no one ever was.');
        if (this.client.isOwner(user)) {
            if (authorUser)
                return msg.reply('You\'re the best bot owner! ♥');
            return msg.reply(`Don't tell them I said this, but I think ${user.username} smells like a paper.`);
        }
        const random = new Random(Random.engines.mt19937().seed(user.id));
        const coolness = random.integer(0, texts.length - 1);
        return msg.say(`${authorUser ? 'You are' : `${user.username} is`} ${texts[coolness]}`);
    }
};
