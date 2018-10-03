const Command = require('../../Structures/Command');
const questions = require('../../Assets/json/would-you-rather');

module.exports = class WouldYouRatherCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'would-you-rather',
            aliases: ['wy-rather', 'wyr'],
            group: 'fun',
            memberName: 'would-you-rather',
            description: 'Responds with a random "Would you rather ...?" question.'
        });
    }

    run(msg) {
        return msg.say(questions[Math.floor(Math.random() * questions.length)]);
    }
};