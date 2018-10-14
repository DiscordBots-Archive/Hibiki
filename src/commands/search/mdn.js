const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const { get } = require('node-superfetch');
 

module.exports = class MDN extends Command {
    constructor(client) {
        super(client, {
            name: 'mdn',
            aliases: ['mozilla-developer-network'],
            group: 'search',
            memberName: 'mdn',
            description: 'Searches MDN for your query.',
            args: [{
                key: 'query',
                prompt: 'What article would you like to search for?',
                type: 'string',
                parse: query => query.replace(/#/g, '.prototype.')
            }]
        });
    }

    async run(msg, { query }) {
        try {
            const { body } = await get('https://developer.mozilla.org/en-US/search.json')
                .query({
                    q: query,
                    locale: 'en-US',
                    highlight: false
                });
            if (!body.documents.length) return msg.say('No results.');
            const data = body.documents[0];
            const embed = new MessageEmbed()
                .setColor(0x066FAD)
                .setAuthor('MDN', 'https://i.imgur.com/DFGXabG.png', 'https://developer.mozilla.org/')
                .setURL(data.url)
                .setTitle(data.title)
                .setDescription(data.excerpt);
            return msg.embed(embed);
        } catch (err) {
            this.captureError(err);
             
        }
    }
};