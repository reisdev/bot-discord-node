const MessageEmbed = require("discord.js").MessageEmbed;

const execute = (bot, msg, args) => {
  const embed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(
      `Seja bem-vindo, ${msg.author.username}#${msg.author.discriminator}!`
    )
    .setDescription("Esta é uma descrição de teste")
    .setThumbnail(
      msg.author.avatar
        ? `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png`
        : `https://cdn.discordapp.com/embed/avatars/${
            msg.author.discriminator % 5
          }.png`
    )
    .setURL("https://twitch.tv/reisdev")
    .setAuthor(
      "ReisDev",
      `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`,
      "https://reisdev.github.io"
    )
    .addFields([
      {
        name: "Você é membro nº",
        value: msg.guild.memberCount,
        inline: true,
      },
      {
        name: "Este é um teste",
        value: "teste",
        inline: true,
      },
    ])
    .setTimestamp()
    .setFooter(
      "ReisDev 2020. Todos os direitos reservados",
      `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`
    );
  msg.channel.send({ embed });
};

module.exports = {
  name: "embed",
  help: "Retorna uma MessageEmbed",
  execute,
};
