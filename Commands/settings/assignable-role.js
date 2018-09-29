const Command = require('../../Structures/Command');

module.exports = class AssignableRole extends Command {
    constructor(client) {
        super(client, {
            name: 'assignable-role',
            aliases: ['add-assign-role', 'add-assignable-role'],
            group: 'settings',
            memberName: 'assignable-role',
            description: 'Adds an assignable role.',
            guildOnly: true,
            args: [{
                key: 'role',
                prompt: 'What would be the assignable role?\n',
                type: 'role'
            }]
        });
    }
    
    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.permissions.has('MANAGE_ROLES');
    }

    run(msg, { role }) {
        msg.guild.settings.set(role.name, role.id);
        return msg.say(`✅ | Succesfully added a **assignable role** - **${role.name}** (**${role.id}**).`);
    }
};
