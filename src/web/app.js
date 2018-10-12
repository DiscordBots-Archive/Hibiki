const express = require('express');
const app = express();
const { info } = require('winston');
const { PORT } = process.env;
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
 
const bodyParser = require('body-parser');

const { createCanvas, loadImage } = require('canvas');
const { join } = require('path');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: 'Too many requests, try again in 15 minutes.'
});

module.exports = (client) => {
    app
        .use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials', true);
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        })
        .use(bodyParser.urlencoded({
            extended: true,
            parameterLimit: 10000,
            limit: '5mb',
        }))
        .use(bodyParser.json({
            parameterLimit: 10000,
            limit: '5mb',
        }))
        .use(cookieParser());

    app
        .get('/api', async (req, res) => {
            res.json({
                current_activity: await client.user.presence.activity ? client.user.presence.activity.name : 'None',
                commands: await client.commands.size,
                servers: await client.guilds.size,
                users: await client.users.size,
            });
        })
        .get('/api/beautiful', limiter, async (req, res) => {
            const base = await loadImage(join(__dirname, '..', '..', 'src', 'assets', 'images', 'beautiful.png'));
            const { image } = req.query;
            const avatar = await loadImage(image);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, base.width, base.height);
            ctx.drawImage(avatar, 249, 24, 105, 105);
            ctx.drawImage(avatar, 249, 223, 105, 105);
            ctx.drawImage(base, 0, 0);
            return res.send(canvas.toBuffer());
        })
        .get('/api/drakeposting', limiter, async (req, res) => {
            const base = await loadImage(join(__dirname, '..', '..', 'src', 'assets', 'images', 'drakeposting.png'));
            const { nah, yeah } = req.query;
            const nahAvatar = await loadImage(nah);
            const yeahAvatar = await loadImage(yeah);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(nahAvatar, 512, 0, 512, 512);
            ctx.drawImage(yeahAvatar, 512, 512, 512, 512);
            return res.send(canvas.toBuffer());
        });
    app.listen(PORT, () => info(`Webserver initialized at port ${PORT}!`));
};