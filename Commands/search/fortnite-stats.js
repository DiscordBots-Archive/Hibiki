const { Command } = require('discord.js-commando');
const rp = require('request-promise-native');
const { fortniteKey } = require('../../Config');
const platforms = ['pc', 'xbl', 'psn'];

module.exports = class FortniteStats extends Command {
    constructor(client) {
        super(client, {
            name: 'fortnite-stats',
            aliases: ['fortnite', 'fortnite-statistics'],
            group: 'games',
            memberName: 'fortnite-stats',
            description: 'Get statistics of a Fortnite player.',
            details: 'Platforms are `pc` (PC), `xbl` (Xbox Live), and `psn` (PlayStation Network).',
            examples: ['fortnite-statistics pc Zaccubus', 'fortnite-stats pc "WBG Strafesh0t"'],
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [{
                key: 'platform',
                prompt: 'What platform do you want to search on?',
                type: 'string',
                parse: platform => platform.toLowerCase(),
                oneOf: platforms
            }, {
                key: 'username',
                prompt: 'What user do you want to look up?',
                type: 'string'
            }]
        });
    }

    async run(msg, { platform, username }) {
        try {
            
            const options = {
                uri: `https://api.fortnitetracker.com/v1/profile/${platform}/${username}`,
                json: true,
                headers: { 'TRN-Api-Key': fortniteKey }
            };

            const stats = await rp(options).catch(err => {
                return msg.say(this.client.translate('commands.error'), err);
            });

            if (stats.error === 'Player Not Found') {
                return msg.say(this.client.translate('commands.fortnite.error'));
            }

            return msg.embed({
                color: this.client.color,
                title: stats.epicUserHandle,
                url: `https://fortnitetracker.com/profile/${platform}/${encodeURIComponent(username)}`,
                footer: { text: this.client.translate('commands.fortnite.footer', this.client.version) },
                fields: [{
                    name: '🏆 Wins',
                    value: `${stats.lifeTimeStats[8].value || '0'} wins (${stats.lifeTimeStats[9].value || '0'})`,
                    inline: true
                }, {
                    name: '💀 Kills',
                    value: `${stats.lifeTimeStats[10].value || '0'} kills. ${stats.lifeTimeStats[11].value || '0'} K/D ratio.`,
                    inline: true
                }, {
                    name: '🎮 Matches Played',
                    value: stats.lifeTimeStats[7].value || '0',
                    inline: true
                }, {
                    name: '🔢 Score',
                    value: stats.lifeTimeStats[6].value || '0',
                    inline: true
                }]
            });
        } catch (err) {
            return msg.say(this.client.translate('commands.error', err.message));
        }
    }
};