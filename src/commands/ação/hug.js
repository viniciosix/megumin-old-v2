const Command = require('../../structures/Command');
const fetch = require('node-fetch');

module.exports = class HugCommand extends Command {
  constructor() {
    super('hug', {
      aliases: ["abraçar"],
      category: "ação",
      description: {
        content: "Abrace um usuário virtualmente.",
        usage: "hug <usuário>",
        examples: ["Megumin", "Megumin#9878", "@Megumin"]
      },
      userPerms: ["SEND_MESSAGES"],
      clientPerm: ["SEND_MESSAGES", "EMBED_LINKS"],
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    });
  }

  async exec({ message, args }) {
    const res = await fetch("https://nekos.life/api/v2/img/hug").then(res => res.json());
    const user = message.getUser(0, true, false);
    if (user.type === 0) return message.say(true, 'você não pode mencionar a si mesmo!');
    if (user.type === 1) return message.say(true, `não foi possível encontrar ${user.mention}`);
   
    message.say(false, new this.client.utils.embed(message.author)
      .setDescription(`${message.author}, deu um abraço em ${user}`)
      .setImage(res.url)
      .setFooter('Use "m.hug @user" para retribuir')
    );
  }
}