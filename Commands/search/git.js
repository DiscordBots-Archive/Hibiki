const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const { get } = require('node-superfetch');

module.exports = class Git extends Command {
    constructor(client) {
        super(client, {
            name: 'git',
            group: 'search',
            memberName: 'git',
            description: 'Show information about latest pulled commit.',
        });
    }

    async run(msg) {
        try {
            const { body } = await get('https://api.github.com/repos/HibikiTeam/Hibiki/commits');
            const commit = body[0];
            const embed = new MessageEmbed()
                .setColor(0x1CABB3)
                .setTitle('GitHub Repository')
                .setURL('https://github.com/HibikiTeam/Hibiki')
                .setAuthor(commit.author.login, commit.author.avatar_url, commit.author.html_url)
                .setTimestamp(new Date(commit.commit.author.date))
                .addField(commit.sha.slice(0, 6), commit.commit.message);
            return msg.embed(embed);
        } catch (err) {
            return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }
    }
};