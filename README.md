<p align="center"><a href="https://github.com/HibikiTeam/Hibiki"><img src="https://cdn.discordapp.com/avatars/480639227516944384/f4b9cafebb7c16fd4e9dc152dd86f68e.png?size=256"></a></p>

<p align="center">
<a href="https://travis-ci.org/HibikiTeam/Hibiki" title="Linux Build Status"><img src="https://travis-ci.org/HibikiTeam/Hibiki.svg?branch=master"/></a>
<a href="https://ci.appveyor.com/project/TishGithub/Hibiki" title="Windows Build Status"><img src="https://ci.appveyor.com/api/projects/status/br7flwfc15hplsyl?svg=true"></a>
</p>

<p align="center">
  <strong>Hibiki</strong> is a multi-powered Discord bot for your needs.
  <br>
  To get list of all commands, run <code>$help</code>.
  <br>
  <a href="https://discordapp.com/oauth2/authorize?client_id=454954755756654602&scope=bot" title"Hibiki Invite">Invite Hibiki</a> | <a href="https://discord.gg/c7whDPq" title="Support Server">Join Support Server</a>
</p>

# Features
- 🔨 Moderation
- ⭐ Starboard
- ➕ Reputation
- 💵 Economy
- 🔞 NSFW commands
- 🔍 Search commands

.. and more!

# Installation / Self Hosting
To self-host Hibiki, you must have the following:

- <a href="https://git-scm.com">Git</a>
- <a href="https://nodejs.org">Node.js</a>
- <a href="https://postgresql.org">PostgreSQL</a>
- <a href="https://redis.io">Redis</a>
- An IDE, like <a href="https://code.visualstudio.com">Visual Studio Code</a> or <a href="https://atom.io">Atom</a>.

## Setup
- Clone the repository (`git clone https://github.com/HibikiTeam/Hibiki`)
- Make sure PostgreSQL and Redis are started.
- Create the database `Hibiki` in PostgreSQL (`createdb Hibiki`).
- Run `npm install` to install dependencies.
- Edit the configuration values in the `.env` file.
- Run `npm run lint` to check for any errors [optional].
- And finally, run the bot. Use either `node bot` or `pm2 start ./pm2.json` (recommended if you're using an VPS).

# Author
**Hibiki** © [@TishDev](https://github.com/TishDev). Released under the [GNU](https://github.com/HibikiTeam/Hibiki/blob/master/LICENSE) license.<br>
Authored and maintained by TishDev. 
