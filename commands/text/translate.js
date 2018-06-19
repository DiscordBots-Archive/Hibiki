const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { get } = require('snekfetch');
const codes = require('../../assets/json/translate');
const { list } = require('../../utils/Util');
const config = require('../../config');

module.exports = class Translate extends Command {
    constructor(client) {
        super(client, {
            name: 'translate',
            aliases: ['yandex', 'yandex-translate'],
            group: 'text',
            memberName: 'translate',
            description: 'Translates your text into a providen language. Powered by Yandex Translate.',
            details: `\`Codes\`: ${Object.keys(codes).join(', ')}`,
            args: [{
                key: 'text',
                prompt: 'What text would you like to translate?',
                type: 'string',
                max: 500
            }, {
                key: 'target',
                prompt: `Which language would you like to translate your text to? Either ${list(Object.keys(codes), 'or')}.`,
                type: 'string',
                validate: target => {
                    const value = target.toLowerCase();
                    if (codes[value] || Object.keys(codes).find(key => codes[key].toLowerCase() === value)) return true;
                    return `Invalid target, please enter either ${list(Object.keys(codes), 'or')}.`;
                },
                parse: target => {
                    const value = target.toLowerCase();
                    if (codes[value]) return value;
                    return Object.keys(codes).find(key => codes[key].toLowerCase() === value);
                }
            },
            {
                key: 'base',
                prompt: `Which language would you like to use as the base? Either ${list(Object.keys(codes), 'or')}.`,
                type: 'string',
                default: '',
                validate: base => {
                    const value = base.toLowerCase();
                    if (codes[value] || Object.keys(codes).find(key => codes[key].toLowerCase() === value)) return true;
                    return `Invalid base, please enter either ${list(Object.keys(codes), 'or')}.`;
                },
                parse: base => {
                    const value = base.toLowerCase();
                    if (codes[value]) return value;
                    return Object.keys(codes).find(key => codes[key].toLowerCase() === value);
                }
            }]
        });
    }

    async run(msg, { text, target, base }) {
        try {
            const { body } = await get('https://translate.yandex.net/api/v1.5/tr.json/translate')
                .query({
                    key: config.keys.yandex,
                    text,
                    lang: base ? `${base}-${target}` : target
                });
            const lang = body.lang.split('-');
            const embed = new MessageEmbed()
                .setColor(0xFF0000)
                .setAuthor('Yandex Translate', 'https://i.imgur.com/HMpH9sq.png')
                .setFooter(`v${this.client.version}`)
                .addField(`❯ From: ${codes[lang[0]]}`, text)
                .addField(`❯ To: ${codes[lang[1]]}`, body.text[0]);
            return msg.embed(embed);
        } catch (err) {
            return msg.say(this.client.translate('commands.error'), err.message);
        }
    }
};
