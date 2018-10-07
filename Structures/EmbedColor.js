const { COLOR } = process.env;

module.exports = (group) => {
    switch (group) {
    case 'analyze':
        return 0x01b7a8;
    case 'economy':
        return 0x6dc066;
    case 'encryption':
        return 0x5ac3ca;
    case 'fun':
        return 0x594878;
    case 'games':
        return 0x000d23;
    case 'image':
        return 0xffc0cb;
    case 'image-edit':
        return 0x0055ff;
    case 'information':
        return 0xffff66;
    case 'marriage':
        return 0xdc6daa;
    case 'nsfw':
        return 0xbb3e3b;
    case 'reputation':
        return 0x101e34;
    case 'roleplay':
        return 0x800080;
    case 'search':
        return 0x7fffd4;
    case 'settings':
        return 0xc6e2ff;
    case 'social':
        return 0xff0000;
    case 'system':
        return 0xe6e6fa;
    case 'tags':
        return 0xffa500;
    case 'text-edit':
        return 0x00ced1;
    case 'utility':
        return 0x666666;
    default: 
        return COLOR;
    }
};