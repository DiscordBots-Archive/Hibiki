const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const { get } = require('snekfetch');
const { WEATHER_KEY } = process.env;

module.exports = class Weather extends Command {
    constructor(client) {
        super(client, {
            name: 'weather',
            group: 'information',
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
                .setColor(this.client.color)
                .setThumbnail(`https://${body.current.condition.icon.slice(2)}`)
                .addField('❯ Name', 
                    body.location.name, true)
                .addField('❯ Region', 
                    body.location.region, true)
                .addField('❯ Country', 
                    body.location.country, true)
                .addField('❯ Timezone',
                    body.location.tz_id, true)
                .addField('❯ Local time', 
                    body.location.localtime, true)
                .addField('❯ Condition',  
                    body.current.condition.text, true)
                .addField('❯ Wind [MPH]', 
                    body.current.wind_mph, true)
                .addField('❯ Wind [KPH]',
                    body.current.wind_kph, true)
                .addField('❯ Feels like', 
                    `℃: ${body.current.feelslike_c}\n°F: ${body.current.feelslike_f}`)
                .addField('❯ Humidity', 
                    body.current.humidity, true);
            msg.say(`ℹ | Weather information about ${body.location.country}`, { embed });
        } catch (err) {
            this.captureError(err);
            return msg.say(`❎ | This command has errored and the devs have been notified about it. Give <@${this.client.options.owner}> this message: \`${err.message}\``);
        }
    }
};