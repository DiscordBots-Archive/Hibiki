module.exports = async (msg, author, question, limit = 60000) => {
    const filter = m => m.author.id === author.id;
    await msg.channel.send(question);
    try {
        const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] });
        return collected.first().content;
    } catch (e) {
        return false;
    }
};