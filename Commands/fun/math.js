const Command = require('../../Structures/Command');
const math = require('mathjs');

module.exports = class Math extends Command {
    constructor(client) {
        super(client, {
            name: 'math',
            group: 'fun',
            memberName: 'math',
            description: 'Responds with a math calculation.',
            guildOnly: true,
            args: [{
                key: 'query',
                prompt: 'What do you want to evaluate?\n',
                type: 'string'
            }]
        });
    }

    run(msg, { query }) {
        const num = math.eval;
        math.import({
            'import':     function () { throw new Error('Function import is disabled');},
            'createUnit': function () { throw new Error('Function createUnit is disabled'); },
            'eval':       function () { throw new Error('Function eval is disabled'); },
            'parse':      function () { throw new Error('Function parse is disabled'); },
            'simplify':   function () { throw new Error('Function simplify is disabled'); },
            'derivative': function () { throw new Error('Function derivative is disabled'); }
        }, { override: true });
        try {
            return msg.say(num(`${query}`));
        } catch (err) {
            this.captureError(err);
            msg.say(err.message);
        }
    }
};
