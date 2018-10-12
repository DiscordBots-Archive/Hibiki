const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const { full, none } = require('../../assets/json/cool');

module.exports = class Cool extends Command {
    constructor(client) {
        super(client, {
            name: 'cool',
            group: 'analyze',
            memberName: 'cool',
            description: 'Check a member\'s coolness.',
            examples: ['cool @User#1234'],
            guildOnly: true,
            args: [{
                key: 'member',
                prompt: 'Which member do you want to check?\n',
                type: 'member',
                default: msg => msg.member
            }]
        });
    }
    async run (msg, { member } ) {
        let coolPercent;
        const embed = new MessageEmbed();

        if (member.id === this.client.user.id) {
            coolPercent = 1e8;
            await embed.setColor(this.groupColor);
            await embed.setDescription(`Why would you ask? I'm ${coolPercent} cool.`);
            await embed.setFooter(this.client.version);
        }

        if (none.includes(member.id)) coolPercent = 0;
        else if (full.includes(member.id)) coolPercent = 1e8;
        else if (member.id === '244509121838186497') coolPercent = 169;
        else coolPercent = coolPercent = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

        if (coolPercent > 50) {
            await embed.setColor(this.groupColor);
            await embed.setDescription(`**${member.user.username}** is **${coolPercent}**% cool! 😎`);
            await embed.setFooter(this.client.version);
        } else {
            await embed.setColor(this.groupColor);
            await embed.setDescription(`**${member.user.username}** is **${coolPercent}**% cool. 😄`);
            await embed.setFooter(this.client.version);
        }

        return msg.embed(embed);
    }
};
