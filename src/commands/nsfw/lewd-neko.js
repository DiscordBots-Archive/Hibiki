const Command = require('../../structures/Command');
const { get } = require('node-superfetch');

module.exports = class LewdNekoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lewd-neko',
            aliases: ['lewd-nekos', 'lewdneko'],
            group: 'image',
            memberName: 'lewd-neko',
            nsfw: true,
            description: 'Responds with a random (lewd) neko image. Requires voting in DBL.',
        });
    }

    async run(msg) {
        this.client.dbl.hasVoted(msg.author.id).then(async voted => {
            if (voted) {
                try {
                    const { body } = await get('https://nekobot.xyz/api/image?type=lewdneko');
                    if (body.nsfw && !msg.channel.nsfw) {
                        return msg.say('This random image is NSFW and I can\'t show you it in a non-NSFW channel! Please try this command again on a NSFW channel.');
                    }
                    return msg.say({ files: [body.message] });
                } catch (err) {
                    return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
                }
            } else {
                msg.channel.send(`Vote for Hibiki in here https://discordbots.org/bot/${this.client.user.id}/vote to run this command.`);
            }
        });
    }
};
