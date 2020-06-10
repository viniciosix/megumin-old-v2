const Command = require('../../structures/Command');

module.exports = class SayCommand extends Command  {
  constructor() {
    super("say", {
      aliases: ["dizer", "falar"],
      category: "diversão",
      arguments: true,
      description: {
        content: "Escreva algo e o bot irá repetir.",
        usage: "say <texto>",
        examples: ["olá", "olá mundo", "A Megumin é linda como uma tulipa"]
      },
      userPerm: ["SEND_MESSAGES"],
      clientPerm: ["SEND_MESSAGES"],
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    });
  }

  exec({ message, args, database }) {
    message.say(false, message.cleanContent.slice(database.prefix.length).trim().split(/\s+/g).slice(1).join(' '));
  }
}
