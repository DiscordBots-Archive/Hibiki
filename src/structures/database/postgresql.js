const Sequelize = require('sequelize');
const winston = require('winston');
const { DB_URL } = process.env;

const database = new Sequelize(DB_URL, { logging: false, operatorsAliases: Sequelize.Op });

class Database {
    static get db() {
        return database;
    }

    static start() {
        database.authenticate()
            .then(() => winston.info('Connection to Postgres database established.'))
            .then(() => winston.info('Started to synchronize Postgres database...'))
            .then(() => database.sync()
                .then(() => winston.info('Done synchronizing.'))
                .catch(error => winston.error(`Error synchronizing the database: \n${error}`))
            )
            .catch(error => {
                winston.error(`Unable to connect to the Postgres database: \n${error}`);
                winston.error('Attempting to reconnect to the Postgres database in 5 seconds...');
                setTimeout(() => Database.start(), 5000);
            });
    }
}

module.exports = Database;
