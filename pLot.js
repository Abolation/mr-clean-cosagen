const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone : true});
const prefix = "+";

bot.on('ready', async() => {
    console.log(`Bot is ready. ${bot.user.username} on duty!`);
    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch(e) {
        console.log(e.stack);
    }
    bot.user.setStatus("online");
    bot.user.setActivity("with cleaning products");
});
function generateFooter() {
    var footers = [
        "Gang Gang🔫",
        "Gang Gang🔫",
        "Gang Gang🔫",
        "Gang Gang🔫"
    ];
    return footers[Math.floor(Math.random() * footers.length)];
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

bot.on("message", async message => {
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    if(!command.startsWith(prefix)) return;
    if(command === `${prefix}ping`) {
        message.channel.send("Pinging...").then(msg => {
            msg.edit(`:ping_pong: **Pong!** \n**Message took **\`\` ${msg.createdTimestamp - message.createdTimestamp}ms \`\``);
        });
    }
    if(command === `${prefix}ban`) {
        if(!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) return message.channel.send("You don't have enough permissions!");
        if(!message.mentions.users.size) return message.channel.send("Please mention someone!");
        if(!message.mentions.members.first().bannable) return message.channel.send("This user is not bannable!");
        let reason = messageArray.slice(2);
        if(!reason || reason == "") return message.channel.send("No reason was provided!");
        reason = reason.join(' ');
        message.channel.send(`Working...`).then((msg) => {
            message.mentions.members.first().ban(reason);
            setTimeout(() => {
                msg.edit(`${message.mentions.members.first()} was banned`);
                var logsChannel = message.guild.channels.find('name', 'logs');
                var banEmbed = new Discord.RichEmbed()
                .setColor(getRandomColor())
                .setAuthor(bot.user.username, bot.user.avatarURL)
                .setFooter("Hello there! 👀", bot.user.avatarURL)
                .addField("**Case:**", "Ban")
                .addField("**Victim:**", message.mentions.members.first().user.username, true)
                .addField("**Banned by:**", message.author.username, true)
                .addField("**Reason:**", reason, true);
                logsChannel.send(banEmbed);
            }, 2000);
        })
    }
    if(command === `${prefix}kick`) {
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have enough permissions!");
        if(!message.mentions.users.size) return message.channel.send("Please mention someone!");
        if(!message.mentions.members.first().kickable) return message.channel.send("This user is not kickable!");
        let reason = messageArray.slice(2);
        if(!reason || reason == "") return message.channel.send("No reason was provided!");
        reason = reason.join(' ');
        message.channel.send("Working...").then((msg) => {
            message.mentions.members.first().kick(reason);
            setTimeout(() => {
                msg.edit(`${message.mentions.members.first()} was kicked!`);
                var logsChannel = message.guild.channels.find('name', 'logs');
                var kickEmbed = new Discord.RichEmbed()
                .setColor(getRandomColor())
                .setAuthor(bot.user.username, bot.user.avatarURL)
                .setFooter("Hello there! 👀", bot.user.avatarURL)
                .addField("**Case:**", "Kick")
                .addField("**Victim:**", message.mentions.members.first().user.username, true)
                .addField("**Kicked by:**", message.author.username, true)
                .addField("**Reason:**", reason, true);
                logsChannel.send(kickEmbed);
            }, 2000);
        });
    }
    if(command === `${prefix}warn`) {
        if(!message.guild.member(guild.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have enough permissions!");
        if(!message.mentions.users.size) return message.channel.send("You didn't mention anyone!");
        var target = message.mentions.members.first();
    }
    if(command === `${prefix}clean`) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have enough permissions!");
        var clearAmount = messageArray[1];
        if(!clearAmount) return message.channel.send("Please specify a number between 1 and 100.");
        if(isNaN(clearAmount)) return message.channel.send("Is this a number?");
        clearAmount = parseInt(clearAmount);
        if(clearAmount > 100) return message.channel.send("Please clean less messages (max: 100)!");
        if(clearAmount < 1) return message.channel.send("Please select a number higher than 1");
        message.channel.fetchMessages({limit : clearAmount + 1})
        .then((msgs) => {
            message.channel.bulkDelete(msgs);
            message.channel.send(`I removed ${clearAmount} messages! Mr. Clean always on duty!`).then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 4000);
            });
            var logsChannel = message.guild.channels.find('name', 'logs');
            var CleanEmbed = new Discord.RichEmbed()
            .setColor(getRandomColor())
            .setAuthor(bot.user.username, bot.user.avatarURL)
            .setFooter("Hello there! 👀", bot.user.avatarURL)
            .addField("**Case:**", "Clean")
            .addField("**Cleaned by:**", message.author.username, true)
            .addField("**Messages Removed:**", clearAmount, true);
            logsChannel.send(pruneEmbed);
        })
        .catch((err) => {
            message.channel.send("Error using the clean command!\n(Messages older than 14 days cannot be deleted!)");
        });
    }
    if(command === `${prefix}dice`) {
        return message.channel.send(`:game_die: You rolled the dice and got \`${Math.floor(Math.random() * (6 - 1 + 1)) + 1}\``);
    }
    if(command === `${prefix}help`) {
        var afterCommand = message.content.split(" ").slice(1).join(" ");
        var helpMenu;
        if(command + afterCommand == command) {
            helpMenu = new Discord.RichEmbed()
                .setAuthor("Help Menu", message.author.avatarURL)
                .setFooter(generateFooter(), bot.user.avatarURL)
                .setColor(getRandomColor())
                .addField('**Mod Commands :**', '`Clean`: Removes a certain amount of messages\n\n`ban`: Bans a member from the server \n\n`kick`: Kicks a member from the server', false)
                .addField('**Misc :**', "`help`: Opens up the help menu\n\n`ping`: Displays your ping to the server\n\n`dice`: Rolls the dice");
        }
        if(command + afterCommand.toLowerCase() == `${command}clean`) {
            helpMenu = new Discord.RichEmbed()
            .setAuthor("Clean Help", message.author.avatarURL)
            .setFooter(generateFooter(), bot.user.avatarURL)
            .setColor(getRandomColor())
            .addField('Clean Command', "This command will delete bulk of messages (max 100)")
            .addField("Usage :" , `${prefix}clean <1-100>`);
        }
        message.channel.send(helpMenu);
    }
});

bot.on("guildMemberAdd", async member => {
    const generalChannel = member.guild.channels.find('name', 'general');
    var logsChannel = member.guild.channels.find('name', 'logs');
    var logsChannel = member.guild.channels.find('name', 'welcome');
    var joinEmbed = new Discord.RichEmbed()
    .setColor(getRandomColor())
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setFooter("Hello there! 👀", bot.user.avatarURL)
    .addField("**Case:**", "Member Join")
    .addField("**Name:**", member.user.username + member.user.discriminator, true);
    logsChannel.send(joinEmbed);
    var italianRole = member.guild.roles.find('name', 'Italian');
    member.addRole(italianRole);
    welcomeChannel.send(`Welcome ${member} to the mafia, please read ${member.guild.channel.find('name', 'rules')}!`);
});


bot.login(process.env.BOT_TOKEN);
