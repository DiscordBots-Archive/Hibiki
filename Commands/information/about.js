const Command = require('../../Structures/Command');
const { stripIndents } = require('common-tags');

module.exports = class About extends Command {
    constructor(client) {
        super(client, {
            name: 'about',
            aliases: ['info', 'information', 'stats'],
            group: 'information',
            memberName: 'about',
            description: 'Information about this bot.',
            guarded: true,
            throttling: {
                usages: 2,
                duration: 3
            }
        });
    }

    run(msg) {
        const { duration } = this.client.modules.Util;
        return msg.say(stripIndents`
        \`\`\`asciidoc\n
        = ${this.client.user.username} =

        [Statistics about ${this.client.user.username}.]
        
        • Uptime :: ${duration(this.client.uptime)}
        • Repository :: https://github.com/HibikiTeam/Hibiki
        • Prefix :: ${this.client.commandPrefix}

        = Statistics =

        • Servers :: ${this.client.guilds.size}
        • Channels :: ${this.client.channels.size}
        • Groups :: ${this.client.registry.groups.size}
        • Commands :: ${this.client.commands.size}
        • Commands used :: ${this.client.cmdsUsed}
        • Users :: ${this.client.users.size}
        \`\`\` 
        `,);
    }
};