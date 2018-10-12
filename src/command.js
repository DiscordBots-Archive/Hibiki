const Command = require('../../structures/Command');

module.exports = class CommandName extends Command {
    constructor(client) {
        super(client, {
            name: '',
            // aliases: [''],
            group: '',
            description: '',
            memberName: ''
            /* 
            args: [{
                key: '',
                prompt: '',
                type: ''
            ]}
            */ 
        });
    }

    run(msg) { // eslint-disable-line

    }
};