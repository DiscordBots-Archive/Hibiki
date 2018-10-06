const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const Redis = require('../../Structures/Redis');

module.exports = class Marry extends Command {
    constructor(client) {
        super(client, {
            name: 'marry',
            group: 'marriage',
            description: 'Marry someone~.',
            memberName: 'marry',
            args: [{
                key: 'user',
                prompt: 'whom do you want to marry?',
                type: 'member'
            }]
        });
    }

    async run(msg, { user }) {
        const testUserMarriage = await Redis.db.getAsync(`marry${msg.author.id}`);
        if (testUserMarriage) {
            const embed = new MessageEmbed()
                .setColor(0xff0000)
                .setDescription(`${user.toString()} is already married!`);
            return msg.channel.send({ embed });
        }
        const resp = await this.client.modules.AwaitReply(msg, user, `Are you sure you want to marry ${user.toString()}?`, 30000);
        if (['yes'].includes(resp.toLowerCase())) {
            await Redis.db.setAsync(`marry${msg.author.id}`, user.id);
            await Redis.db.setAsync(`marry${user.id}`, msg.author.id);
            const embed = new MessageEmbed()
                .setColor(0x7CFC00)
                .setDescription(`${msg.author.toString()}, you're now married with ${user.toString()}!~`);
            return msg.channel.send({ embed });
        }  else if (['no', 'cancel'].includes(resp.toLowerCase())) {
            const embed = new MessageEmbed()
                .setColor(0xff0000)
                .setDescription(`${msg.author.toString()}, better luck next time.`);
            return msg.channel.send({ embed });
        }
    }
};