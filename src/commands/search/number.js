const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const { get } = require('node-superfetch');

module.exports = class Number extends Command {
    constructor(client) {
        super(client, {
            name: 'number',
            aliases: ['numfact'],
            group: 'search',
            memberName: 'number',
            description: 'Show a fact about a providen number.',
            args: [{
                key: 'number',
                prompt: 'What is the number you want to look up?\n',
                type: 'integer',
                default: '1'
            }]
        });
    }

    async run(msg, { number }) {
        try {
            const { body } = await get(`http://numbersapi.com/${number}`);
            const embed = new MessageEmbed()
                .setColor(this.groupColor)
                .setDescription(body);
            return msg.embed(embed);
        } catch (err) {
            return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }
    }
};