const Command = require('../../Structures/Command');

module.exports = class AssignRole extends Command {
    constructor(client) {
        super(client, {
            name: 'assign',
            aliases: ['assign-role'],
            group: 'utility',
            memberName: 'assign',
            description: 'Gives you an assignable role.',
            guildOnly: true,
            args: [{
                key: 'role',
                prompt: 'What would be the assignable role?\n',
                type: 'string'
            }]
        });
    }

    run(msg, { role }) {
        const roleDoc = msg.guild.settings.get(role);
        try {
            const roleDocument = msg.guild.roles.get(roleDoc);
            if (msg.member.roles.has(roleDoc)) return msg.say('You already have that role!');
            msg.member.roles.add([roleDoc]);
            return msg.say(`✅ | Succesfully assigned you a **assignable role** - **${roleDocument.name}** (**${roleDocument.id}**).`);
        } catch (err) {
            if (err.message === 'Cannot read property \'name\' of undefined') {
                msg.say('Could not find the role.');
            }
            this.captureError(err);
            return msg.say(`❎ | This command has errored and the devs have been notified about it. Give <@${this.client.options.owner}> this message: \`${err.message}\``);
        }
    }
};
