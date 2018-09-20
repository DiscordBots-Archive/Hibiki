module.exports = {

    /*
        The blacklist message. Used when an user is blacklisted from using your bot.
        Placeholders:
        * <user> - The user's tag.
        * <bot> - The bot's tag.
        * <owner> - The owner's tag.
    */
    
    blacklistMessage: '',
    
    /*
        The callback URL for your bot. Used for dashboard login.
        You can get your Callback URL by going here: https://discordapp.com/developers/applications/me
    */

    callbackURL: '',

    /*
        Cat API key.
        Get your Cat API key here: https://thecatapi.com/api-key-registration.html
    */

    catKey: '',

    /*
        The Client ID for your bot.
    */

    clientID: '',

    /* 
        The Client Secret for your bot.
    */

    clientSecret: '',

    /*
        The color for your bot. Can be random HEX color, must be started at 0x.
    */

    color: 0xFF0000,

    /*
        The prefix for your bot.
    */

    commandPrefix: '',

    /*
        Choose if you want @everyone to be disabled from your bot.
    */

    disableEveryone: true,

    /*
        The encryption key to store encryption data. 
        DON'T SHARE THIS WITH ANYONE!
        Can be random characters long (see encryptionMin).
    */

    encryptionKey: '',

    /*
        The encryption key maximum character length.
    */

    encryptionMin: 16,

    /*
        Fortnite API key.
        Get yours here: https://fortnitetracker.com/site-api
    */

    fortniteKey: '',

    /*
        Activity games for your bot. 
        Must have at-least 2 activities, can be an array.
    */

    games: ['your', 'games', 'here!'],

    /*
        Google API key.
    */

    googleAPI: '',

    /*
        Google Custom search ID.
    */

    googleSearchID: '',

    /*
        GitHub Gist API key.
        Go to GitHub, Profile Settings, Developer Settings and then go to Personal Access Tokens.
        Create a new app with "gist" permissions.
    */

    gistKey: '',

    /*
        Guild log channel for your bot. 
        Used to store the new/left guild message logs and more.
    */

    guildLog: '',

    /*
        Support invite for your bot's server. 
        Specify this to null if you want to disable it.
    */

    invite: '',

    /*
        Genius API key.
        Get yours here: https://docs.genius.com
    */

    lyricsKey: '',

    /*
        osu! API key.
        Get yours here: https://osu.ppy.sh/p/api
    */

    osuKey: '',

    /*
        Owner ID for your bot to have full control of your bot.
    */

    owner: '',

    /*
        How many paginated items per page.
    */

    paginated_items: 10,

    /*
        Redis host. (default is localhost)
    */

    redisHost: 'localhost',

    /*
        Your Sentry DSN key.
        Leave empty to disable Sentry.

    */

    sentry: '',

    /*
        Your Discord bot's token. 
        DON'T SHARE THIS WITH ANYBODY!
    */

    token: '',

    /*
        Yandex Translate API key.
        Get yours here: https://tech.yandex.com/translate/

    */
    translateKey: '',

    /*
        Decide if you want to show "Unknown command" messages,
        whenever used executed a non-existing command.
    */
    unknownCommandResponse: false,

    /*
        Apixu API key for weather.
        Get yours here: https://www.apixu.com/
    */

    weatherKey: ''
};