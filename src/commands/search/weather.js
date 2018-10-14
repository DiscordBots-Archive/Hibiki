const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const { get } = require('node-superfetch');
const { WEATHER_KEY } = process.env;

module.exports = class Weather extends Command {
    constructor(client) {
        super(client, {
            name: 'weather',
            group: 'search',
            memberName: 'weather',
            description: 'Gives weather information about providen city/country, etc.',
            examples: ['weather Japan'],
            args: [{
                key: 'cityOrCountry',
                prompt: 'What is the city or country?\n',
                type: 'string'
            }]
        });
    }

    async run(msg, { cityOrCountry }) {
        try {
            const { body } = await get(`https://api.apixu.com/v1/current.json?key=${WEATHER_KEY}&q=${cityOrCountry}`);
            const embed = new MessageEmbed()
                .setColor(this.groupColor)
                .setDescription(`It's currently **${body.current.feelslike_c} ℃** in **${body.location.name}, ${body.location.region}**.`);
            msg.embed(embed);
        } catch (err) {
            this.captureError(err);
             
        }
    }
};