const { Command } = require('discord-akairo');
const { get } = require('node-superfetch');
const Logger = require('../../util/Logger');

class SpoopyLinkCommand extends Command {
    constructor() {
        super('spoopy-link', {
            aliases: ['spoopy-link'],
            category: 'analyze',
            description: { content: 'Determines if a link is spoopy or not.' },
            args: [{
                id: 'site',
                match: 'content',
                type: 'string',
                prompt: {
                    start: 'What site do you think is spoopy?',
                    retry: 'Invalid site, try again.'
                }
            }]
        });
    }

    async spoopy(link) {
        const { body } = await get(`https://spoopy.link/api/${link}`);
        return `
            ${body.safe ? 'Safe!' : 'Not safe...'}
            ${body.chain.map(url => `<${url.url}> ${url.safe ? '✅' : `❌ (${url.reasons.join(', ')})`}`).join('\n')}
        `;
    }

    async exec(msg, { site }) {
        try {
            const check = await this.spoopy(site);
            return msg.util.send([check]);
        } catch (err) {
            Logger.error('Error sending gender data:');
            Logger.stacktrace(err);
            return msg.util.send(`Failed to send gender data \`${err.message}\`.`);
        }
    }
}

module.exports = SpoopyLinkCommand;