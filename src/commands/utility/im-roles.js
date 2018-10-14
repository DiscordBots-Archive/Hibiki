const Command = require('../../structures/Command');
const Guild = require('../../models/Guild');
const { MessageEmbed } = require('discord.js');

module.exports = class ImRolesCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'im-roles',
            aliases: ['assign-roles', 'assignable-roles'],
            group: 'utility',
            memberName: 'im-role',
            description: 'Lists assignable roles for the current server.',
            guildOnly: true
        });
    }

    async run(msg) {
        let settings = await Guild.findOne({ where: { guildID: msg.guild.id } });
        let assignableRoles = settings.assignableRoles.roles;
        const embed = new MessageEmbed()
            .setTitle('Assignable roles for this server')
            .setDescription(msg.guild.roles.filter(role => assignableRoles.includes(role.id)).map(role => role.name).join(', '));
        msg.embed(embed);
    }
};