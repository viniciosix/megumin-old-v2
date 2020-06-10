const Command = require('../../structures/Command');

module.exports = class MagicballCommand extends Command {
  constructor() {
    super("8ball", {
      category: "diversão",
      arguments: true,
      description: {
        content: "Faça uma pergunta para a bola mágica.",
        usage: "8ball <pergunta>",
        examples: ["A Megumin é linda?", "Eu sou burro?"]
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
    const questions = ["Sim", "Não", "Claro", "Lógico", "Provavelmente", "Talvez", "Não sei."];
    
    message.say(false, `> ${questions[Math.floor(Math.random() * questions.length)]}`);
  }
}
