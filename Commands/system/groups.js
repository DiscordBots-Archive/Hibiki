const { stripIndents } = require('common-tags');
const { Command } = require('discord.js-commando');

module.exports = class Groups extends Command {
    constructor(client) {
        super(client, {
            name: 'groups',
            aliases: ['list-groups', 'show-groups', 'all-groups'],
            group: 'system',
            memberName: 'groups',
            description: 'Lists all command groups.',
            guarded: true
        });
    }

    run(msg) {
        return msg.say(stripIndents`
			\`Groups\`
			${this.client.registry.groups.map(grp =>
        `**${grp.name}:** ${grp.isEnabledIn(msg.guild) ? 'Enabled' : 'Disabled'}`
    ).join('\n')}.
		`);
    }
};
