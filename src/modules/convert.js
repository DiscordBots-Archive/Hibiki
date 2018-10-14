module.exports = class Convert {
    static region(region) {
        switch (region) {
        case 'brazil':
            return 'Brazil :flag_br:';
        case 'eu-central':
            return 'Central Europe :flag_eu:';
        case 'eu-west':
            return 'Western Europe :flag_eu:';
        case 'hongkong':
            return 'Hong Kong :flag_hk:';
        case 'london':
            return 'London :flag_gb:';
        case 'japan':
            return 'Japan :flag_jp:';
        case 'russia':
            return 'Russia :flag_ru:';
        case 'singapore':
            return 'Singapore :flag_sg:';
        case 'sydney':
            return 'Sydney :flag_au:';
        case 'us-central':
            return 'US Central :flag_us:';
        case 'us-east':
            return 'US East :flag_us:';
        case 'us-south':
            return 'US South :flag_us:';
        case 'us-west':
            return 'US West :flag_us:';
        }
    }
    
    static bytes(bytes) {
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 B';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    static filter(filter) {
        switch (filter) {
        case null || undefined || '':
            return 'None';
        case 'invites':
            return 'Invites';
        case 'user':
            return 'User';
        case 'bots':
            return 'Bots';
        case 'you':
            return 'You';
        case 'uploads':
            return 'Uploads';
        case 'links':
            return 'Links';
        }
    }

    static status(status) {
        switch (status) {
        case 'online':
            return 'Online';
        case 'idle':
            return 'Away/Busy';
        case 'dnd':
            return 'Do not Disturb';
        case 'offline':
            return 'Invisible/Offline';
        }
    }
};