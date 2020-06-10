const Command = require("../../structures/Command");
const fetch = require("node-fetch");

module.exports = class KissCommand extends Command {
  constructor() {
    super("kiss", {
      aliases: ["beijar"],
      category: "ação",
      description: {
        content: "Beije alguém virtualmente.",
        usage: "kiss <usuário>",
        examples: ["Megumin", "Megumin#9878", "@Megumin"]
      },
      userPerm: ["SEND_MESSAGES"],
      clientPerm: ["SEND_MESSAGES", "EMBED_LINKS"],
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    });
  }

  async exec({ message, args }) {
    const res = await fetch("https://nekos.life/api/v2/img/kiss").then(res =>res.json());
    const user = message.getUser(0, true, false);
    if (user.type === 0) return message.say(true, 'você não pode mencionar a si mesmo!');
    if (user.type === 1) return message.say(true, `não foi possível encontrar ${user.mention}`);

    message.say(false, new this.client.utils.embed(message.author)
      .setDescription(`${message.author}, deu um beijo em ${user}`)
      .setImage(res.url)
      .setFooter('Use "m.kiss @user" para retribuir')
    );
  }
};
