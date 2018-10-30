const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            aliases: ['commands', 'command-list'],
            group: 'information',
            memberName: 'help',
            description: 'Displays a list of available commands, or detailed information for a specific command.',
            guarded: true,
            args: [
                {
                    key: 'command',
                    prompt: 'Which command would you like to view the help for?',
                    type: 'command',
                    default: ''
                }
            ]
        });
    }

    async run(msg, { command }) {
        if (!command) {
            const embed = new MessageEmbed()
                .setTitle('Command List')
                .setColor(this.groupColor)
                .setDescription(stripIndents`
                    Use ${msg.usage('<command>')} to view detailed information about a command. 
                    The support server is ${this.client.options.invite}.
                `)
                .setFooter(`${this.client.registry.commands.size} commands`);
            for (const group of this.client.registry.groups.values()) {
                embed.addField(group.name, `\`${group.commands.map(cmd => cmd.name).join('` `')}\`` || 'None');
            }
            try {
                const msgs = [];
                msgs.push(await msg.direct({ embed }));
                if (msg.channel.type !== 'dm') msgs.push(await msg.say('📬 Sent you a DM with information.'));
                return msgs;
            } catch (err) {
                const msgs = [];
                msgs.push(await msg.embed(embed));
                return msgs;
            }
        }
        const embed = new MessageEmbed()
            .setColor(this.groupColor)
            .setTitle(`__Command **${command.name}**__${command.guildOnly ? ' (Usable only in servers)' : ''}`)
            .setDescription(`${command.description}${command.details ? `\n_${command.details}_` : ''}`)
            .addField('Format', `${msg.anyUsage(`${command.name} ${command.format || ''}`)}`, true)
            .addField('Aliases', `${command.aliases.join(', ') || 'None'}`, true)
            .addField('Group', `${command.group.name} (\`${command.groupID}:${command.memberName}\`)`);
        return msg.embed(embed);
    }
};