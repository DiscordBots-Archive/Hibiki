module.exports = class Text {
    static toTitleCase(str) {
        return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }

    static clean(msg, content) {
        return content.replace(/@everyone/g, '@\u200Beveryone')
            .replace(/@here/g, '@\u200Bhere')
            .replace(/<@&[0-9]+>/g, roles => {
                const replaceID = roles.replace(/<|&|>|@/g, '');
                const role = msg.guild.roles.get(replaceID);

                return `@${role.name}`;
            })
            .replace(/<@!?[0-9]+>/g, user => {
                const replaceID = user.replace(/<|!|>|@/g, '');
                const member = msg.guild.members.get(replaceID);

                return `@${member.user.username}`;
            });
    }

    static vaporwave(content) {
        return content.replace(/[a-zA-Z0-9!\?\.'";:\]\[}{\)\(@#\$%\^&\*\-_=\+`~><]/g, (c) => String.fromCharCode(0xFEE0 + c.charCodeAt(0))).replace(/ /g, '　'); // eslint-disable-line no-useless-escape
    }
};