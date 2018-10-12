const Sequelize = require('sequelize');

const Database = require('../structures/database/postgresql');

let GuildSettings = Database.db.define('Guild', {
    guildID: Sequelize.STRING,
    assignableRoles: {
        type: Sequelize.JSONB(), // eslint-disable-line new-cap
        defaultValue: {}
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ['guildID']
        }
    ]
});

GuildSettings.sync();

module.exports = GuildSettings;