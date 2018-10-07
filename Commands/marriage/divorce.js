const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const Redis = require('../../Structures/Redis');

module.exports = class Divorce extends Command {
    constructor(client) {
        super(client, {
            name: 'divorce',
            group: 'marriage',
            description: 'Divorce someone you married.',
            memberName: 'divorce'
        });
    }

    async run(msg) {
        const authorMarriage = await Redis.db.getAsync(`marry${msg.author.id}`);
        if (!authorMarriage) {
            const embed = new MessageEmbed()
                .setColor(0xff0000)
                .setDescription('You are not married!');
            return msg.channel.send({ embed });
        }
        
        const resp = await this.client.modules.AwaitReply(msg, msg.author, 'Are you sure you want to divorce your partner?', 30000);
        if (['yes'].includes(resp.toLowerCase())) {
            await Redis.db.del(`marry${msg.author.id}`);
            await Redis.db.del(`marry${authorMarriage}`);
            const embed = new MessageEmbed()
                .setColor(0xff0000)
                .setTitle('💔 Divorce')
                .setDescription('You\'re now divorced with your partner.');
            return msg.channel.send({ embed });
        } else if (['no', 'cancel'].includes(resp.toLowerCase())) {
            const embed = new MessageEmbed()
                .setColor(0x7CFC00)
                .setTitle('😌 Phew..')
                .setDescription('You\'re still together with your partner!');
            return msg.channel.send({ embed });
        }
    }
};