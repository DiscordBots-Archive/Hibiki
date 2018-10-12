const { GIST } = process.env;
const { error } = require('winston');
const { post } = require('node-superfetch');
const { captureException } = require('raven');

module.exports = class Upload {
    static async gist(content) {
        let gist;
        try {
            gist = await post('https://api.github.com/gists')
                .set('Authorization', `Token ${GIST}`).send({
                    description: 'Evaluated code',
                    public: false,
                    files: {
                        'exec.md': {
                            content
                        }
                    }
                });
        } catch (err) {
            captureException(err);
            error(err.stack);
        }

        return gist;
    }

    static async haste(content) {
        const { body } = await post('https://hastebin.com/documents').send(content.code);

        return `https://hastebin.com/${body.key}.${content.lang || 'js'}`;
    }
};