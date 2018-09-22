const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const filterLevels = ['Off', 'No Role', 'Everyone'];
const verificationLevels = ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'];

module.exports = class Server extends Command {
    constructor(client) {
        super(client, {
            name: 'server',
            aliases: ['server-info', 'guild-info', 'guild'],
            group: 'information',
            memberName: 'server-info',
            description: 'Retrieves server information.\n',
            guildOnly: true,
            args: [{
                key: 'server',
                prompt: 'Which guild do you want to lookup?',
                type: 'string',
                default: msg => msg.guild
            }]
        });
    }
    run(msg, { server }) {
        const guild = server ? this.client.guilds.get(server) : msg.guild;
        const embed = new MessageEmbed()
            .setThumbnail(guild.iconURL({ size: 2048 }))
            .setColor(this.client.color)
            .addField('❯ Server Name',
                `${guild.name}`, true)
            .addField('❯ Server ID',
                `${guild.id}`, true)
            .addField('❯ Created at',
                `${moment.utc(guild.createdAt).format('MMMM Do YYYY, HH:mm:ss')}`, true)
            .addField('❯ Server region',
                `${this.client.modules.Region(guild.region)}`, true)
            .addField('❯ Server owner',
                `${this.client.users.get(guild.ownerID).tag} 👑`, true)
            .addField('❯ Members',
                `${guild.memberCount}`, true)
            .addField('❯ Roles',
                `${guild.roles.size}`, true)
            .addField('❯ Channels',
                `${guild.channels.size}`, true)
            .addField('❯ Server filter',
                `${filterLevels[guild.explicitContentFilter]}`, true)
            .addField('❯ Server verification level',
                `${verificationLevels[guild.verificationLevel]}`, true)
            .addField('❯ AFK channel',
                `${guild.afkChannelID ? `<#${guild.afkChannelID}> after ${guild.afkTimeout / 60}min` : 'None'}`, true);
        return msg.embed(embed);

    }
};