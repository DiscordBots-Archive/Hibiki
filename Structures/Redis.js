const { promisifyAll } = require('tsubaki');
const { RedisClient, createClient, Multi } = require('redis');
const { error, warn } = require('winston');
const { redisHost, redisPort } = require('../Config');

promisifyAll(RedisClient.prototype);
promisifyAll(Multi.prototype);

const redis = createClient({ host: redisHost, port: redisPort });

class Redis {
    static get db() {
        return redis;
    }

    static start() {
        redis.on('error', err => error(`[REDIS]: Encountered error: \n${err}`))
            .on('reconnecting', () => warn('[REDIS]: Reconnecting...'));
    }
}

module.exports = Redis;
