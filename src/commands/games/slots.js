const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');
const { MessageEmbed } = require('discord.js');

const Currency = require('../../structures/economy/currency');
const slots = ['🍇', '🍊', '🍐', '🍒', '🍋'];

module.exports = class SlotsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'slots',
            group: 'games',
            memberName: 'slots',
            description: 'Play a game of slots.'
        });
    }

    run(msg) {
        const slotOne = slots[Math.floor(Math.random() * slots.length)];
        const slotTwo = slots[Math.floor(Math.random() * slots.length)];
        const slotThree = slots[Math.floor(Math.random() * slots.length)];
		
        const slots1 = slots[Math.floor(Math.random() * slots.length)];
        const slots2 = slots[Math.floor(Math.random() * slots.length)];
        const slots3 = slots[Math.floor(Math.random() * slots.length)];
		
        const slot1 = slots[Math.floor(Math.random() * slots.length)];
        const slot2 = slots[Math.floor(Math.random() * slots.length)];
        const slot3 = slots[Math.floor(Math.random() * slots.length)];
        
        if (slotOne === slotTwo && slotOne === slotThree) {
            const embed = new MessageEmbed()
                .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ format: 'png' }))
                .setColor(this.groupColor)
                .setDescription(stripIndents`
			    **${slots1} | ${slots2} | ${slots3}**
			    **${slotOne} | ${slotTwo} | ${slotThree} <=**
			    **${slot1} | ${slot2} | ${slot3}**
                Congratulations, you won! 🎉
                `)
                .setFooter(`You received 100 ${Currency.textPlural}.`);
            msg.embed(embed);
            return Currency.addBalance(msg.author.id, 100);
        } else if (slots1 === slots2 && slots1 === slots3) {
            const embed = new MessageEmbed()
                .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ format: 'png' }))
                .setColor(this.groupColor)
                .setDescription(stripIndents`
			    **${slots1} | ${slots2} | ${slots3} <=**
			    **${slotOne} | ${slotTwo} | ${slotThree}**
			    **${slot1} | ${slot2} | ${slot3}**
                Congratulations, you won! 🎉
                `)
                .setFooter(`You received 100 ${Currency.textPlural}.`);
            msg.embed(embed);
            return Currency.addBalance(msg.author.id, 100);
        } else if (slot1 === slot2 && slot1 === slot3) {
            const embed = new MessageEmbed()
                .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ format: 'png' }))
                .setColor(this.groupColor)
                .setDescription(stripIndents`
			    **${slots1} | ${slots2} | ${slots3}**
			    **${slotOne} | ${slotTwo} | ${slotThree}**
			    **${slot1} | ${slot2} | ${slot3} <=**
                Congratulations, you won! 🎉
                `)
                .setFooter(`You received 100 ${Currency.textPlural}.`);
            msg.embed(embed);
            return Currency.addBalance(msg.author.id, 80);
        } else {
            const embed = new MessageEmbed()
                .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ format: 'png' }))
                .setColor(0xFF0000)
                .setDescription(stripIndents`
			    **${slots1} | ${slots2} | ${slots3}**
			    **${slotOne} | ${slotTwo} | ${slotThree}**
			    **${slot1} | ${slot2} | ${slot3}**
                You lost.
                `)
                .setFooter(`You lost 40 ${Currency.textPlural}.`);
            msg.embed(embed);
            return Currency.removeBalance(msg.author.id, 40);
        }
    }
};