const { CommandoClient } = require('discord.js-commando');
const { readdirSync } = require('fs');
const { version } = require('../../package');
const { COLOR, TOKEN, DBL_KEY } = process.env;

const winston = require('winston');
const DBL = require('dblapi.js');

const Database = require('./database/postgresql');
const Redis = require('./database/redis');
const Command = require('../handlers/command');
const Event = require('../handlers/event');
const Webserver = require('../web/app');

module.exports = class Hibiki extends CommandoClient {
    constructor (options) {
        super (options);
        this.color = COLOR;
        this.commands = this.registry.commands;
        this.cmdsUsed = 0;
        this.database = Database.db;
        this.dbl = new DBL(DBL_KEY, this.client);
        this.logger = winston;
        this.modules = {};
        this.redis = Redis.db;
        this.version = `v${version}`;

        for (const module of readdirSync('./src/modules/')) {
            const moduleName = module.split('.')[0];
            this.modules[moduleName] = require(`../modules/${moduleName}`);
        }

        this.encryptor = new this.modules.encryption();

        process.on('unhandledRejection', async (err) => {
            if (err.code === 50006 || err.code === 50007 || err.code === 50013) return;
            await this.logger.error(`[UNHANDLED PROMISE REJECTION]:\n${err.stack}`);
        });

        process.on('SIGINT', async () => {
            this.logger.info(`Process received SIGINT, terminating bot.\nTotal commands ran today: ${this.cmdsUsed}`);
            await process.exit();
        });

    }

    async dbInit () {
        await Database.start();
        await Redis.start();
    }

    async start () {
        await this.logger.info('Command handler initialized.');
        await Command(this);

        await this.logger.info('Event handler initialized.');
        await Event(this);

        await this.logger.info('Loading to Discord..');
        await this.login(TOKEN);

        await this.dbInit();

        await this.logger.info('Loading webserver.');
        await Webserver(this);
    }
};