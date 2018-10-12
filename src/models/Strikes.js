const Sequelize = require('sequelize');

const Database = require('../structures/database/postgresql');

const Strike = Database.db.define('Strike', {
    strikeID: Sequelize.STRING,
    userID: Sequelize.STRING,
    guildID: Sequelize.STRING,
    strikeBy: Sequelize.STRING,
    strikeMessage: Sequelize.STRING
});

Strike.sync();

module.exports = Strike;