const Command = require('../../structures/Command');
const Currency = require('../../structures/economy/currency');
const moment = require('moment'); 
require('moment-duration-format');

module.exports = class Vote extends Command {
    constructor(client) {
        super(client, {
            name: 'vote',
            aliases: ['vote-claim-reward'],
            group: 'utility',
            memberName: 'vote',
            description: 'Get 100 points for voting to Hibiki on DBL (must actually vote).',
            examples: ['vote'],
            guarded: true,
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    async run(msg) {
        const timeUntilCollection = await this.client.redis.getAsync(`vote${msg.author.id}`) - Date.now();
        if (timeUntilCollection > 0) {
            msg.channel.send(`You have already voted! Please wait ${moment.duration(timeUntilCollection).format('h [hours] m [minutes] s [seconds]')} to vote.`);
        } else if (timeUntilCollection <= 0) {
            this.client.dbl.hasVoted(msg.author.id).then(voted => {
                if (voted) {
                    this.client.redis.setAsync(`points${msg.author.id}`, 200);
                    Currency.addBalance(msg.author.id, 500);
                    this.client.redis.setAsync(`vote${msg.author.id}`, Date.now() + 43200000);
                    this.client.redis.expireAsync(`vote${msg.author.id}`, Date.now() + 43200000);
                    msg.author.send(`Thank you for voting for ${this.client.user.username}! You received 500 cheese and 200 points. You can vote again every 12 hours. `);
                } else {
                    msg.channel.send(`Vote for Hibiki in here https://discordbots.org/bot/${this.client.user.id}/vote to receive 500 cheese and 200 points.`);
                }
            });
        }
    }
};