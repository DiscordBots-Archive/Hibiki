const { activities } = require('../assets/json/messages');

module.exports = async (client) => {
    await client.logger.info(`${client.user.tag} (version ${client.version}) is connected and is ready.`);
    if (client.guilds.size == 0) await client.logger.warn(`${client.user.username} is in zero servers. Invite it by using this link: ${await client.generateInvite(['ADMINISTRATOR'])}.`);
    await client.user.setActivity(`in ${client.guilds.size} servers`);
    await setInterval(() => {
        const activity = activities[Math.floor(Math.random() * activities.length)]
            .replace(/(<servers>)/, client.guilds.size)
            .replace(/(<prefix>)/, client.commandPrefix);
        client.user.setActivity(activity);
    }, 900000);
};