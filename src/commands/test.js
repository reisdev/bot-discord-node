const search = require("yt-search");
const ytdl = require("ytdl-core-discord");
exports.run = async (bot, msg, args) => {
  const s = args.join(" ");
  try {
    search(s, (err, result) => {
      if (err) {
        throw err;
      } else if (result && result.videos.length > 0) {
        const song = result.videos[0];
        playSong(bot, msg, song);
      } else {
        return msg.reply("Desculpe nao encontrei o que voce deseja ouvir!");
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const playSong = async (bot, msg, song) => {
  if (!song) {
    return;
  }
  if (!msg.member.voice.channel) {
    return msg.channel.send(
      "Voce precisa estar em um canal de voz para ouvir musica!"
    );
  }

  let queue = bot.queues.get(msg.member.guild.id);
  if (!queue) {
    const conn = await msg.member.voice.channel.join();
    queue = {
      volume: 10,
      connection: conn,
      dispatcher: null,
      songs: [song],
    };
    queue.dispatcher = queue.connection.play(await ytdl(song.url), {
      type: "opus",
    });
    queue.dispatcher.on("finish", () => {
      queue.songs.shift();
      playSong(bot, msg, queue, songs[0]);
    });
    bot.queues.set(msg.member.guild.id, queue);
  } else {
    queue.songs.push(song);
    bot.queues.set(msg.member.guild.id);
  }
};

module.exports.config = {
  name: "play",
  description: "Tocar uma musica",
  usage: "n!play link",
  accessableby: "Membros",
  aliases: ["p"],
};
