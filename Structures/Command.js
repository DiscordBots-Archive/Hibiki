const { Command } = require('discord.js-commando');
const SwitchColor = require('./EmbedColor');
const Raven = require('raven');

module.exports = class CommandStruct extends Command {
    constructor(client, opts) {
        super(client, opts);
        this.groupColor = SwitchColor(opts.group);

        this.captureError = (err) => {
            Raven.captureException(err);
        };

    }
};