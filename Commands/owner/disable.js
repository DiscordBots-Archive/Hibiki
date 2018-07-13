const { oneLine } = require('common-tags');
const { Command } = require('discord.js-commando');

module.exports = class Disable extends Command {
    constructor(client) {
        super(client, {
            name: 'disable',
            aliases: ['disable-command', 'cmd-off', 'command-off'],
            group: 'owner',
            memberName: 'disable',
            description: 'Disables a command or command group.',
            details: oneLine`
				The argument must be the name/ID (partial or whole) of a command or command group.
				Only administrators may use this command.
			`,
            examples: ['disable util', 'disable Utility', 'disable prefix'],
            guarded: true,

            args: [{
                key: 'cmdOrGrp',
                label: 'command/group',
                prompt: 'Which command or group would you like to disable?\n',
                type: 'group|command'
            }]
        });
    }

    hasPermission(msg) {
        if (!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || this.client.modules.IsStaff(msg.member);
    }

    run(msg, { cmdOrGrp }) {
        if(!cmdOrGrp.isEnabledIn(msg.guild, true)) {
            return msg.say(
                `❎ | The \`${cmdOrGrp.name}\` ${cmdOrGrp.group ? 'command' : 'group'} is already disabled.`
            );
        }
        if(cmdOrGrp.guarded) {
            return msg.say(
                `❎ | You cannot disable the \`${cmdOrGrp.name}\` ${cmdOrGrp.group ? 'command' : 'group'}.`
            );
        }
        cmdOrGrp.setEnabledIn(msg.guild, false);
        return msg.say(`✅ | Succesfully disabled the \`${cmdOrGrp.name}\` ${cmdOrGrp.group ? 'command' : 'group'}.`);
    }
};
