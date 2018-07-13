const { Command } = require('discord.js-commando');

module.exports = class RemoveRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'remove-role',
            aliases: ['rr', 'rrole', 'dr', 'removerole'],
            group: 'mod',
            memberName: 'remove-role',
            description: 'Removes a role from the user.',
            guildOnly: true,
            args: [{
                key: 'member',
                prompt: 'What user would you like to remove the role to?\n',
                type: 'member'
            }, {
                key: 'role',
                prompt: 'What role would you like to remove from user?\n',
                type: 'role'
            }]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) || this.client.modules.IsStaff(msg.member);
    }

    async run(msg, { member, role }) {
        const botMember = await msg.guild.members.fetch(msg.client.user);
        if (!botMember.permissions.has('MANAGE_ROLES')) 
            return msg.say('Sorry, I don\'t have permissions to manage roles.');

        await member.roles.remove([role]);
        await msg.react('✅');
    }
};