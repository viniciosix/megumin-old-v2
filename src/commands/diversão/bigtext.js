const Command = require("../../structures/Command");
const Letters = require('../../util/assets/letters');

module.exports = class BigTextCommand extends Command {
  constructor() {
    super("bigtext", {
      category: "diversão",
      arguments: true,
      description: {
        content: "Escreva algo e o bot retornará em forma de bigtext.",
        usage: "bigtext <texto>",
        examples: ["olá", "olá mundo", "1234"]
      },
      userPerm: ["SEND_MESSAGES"],
      clientPerm: ["SEND_MESSAGES"],
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    });
  }

  exec({ message, args }) {
    message.say(false,
      args.join("  ").toLowerCase()
        .replace(/./g, char => Letters[char.normalize('NFD').replace(/[\u0300-\u036f]/g, '')])
        .replace(/undefined/g, '--')
    );
  }
};
