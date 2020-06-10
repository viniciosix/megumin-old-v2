const Command = require('../../structures/Command')
module.exports = class ChooseCommand extends Command {
  constructor(){
    super('choose', {
      category: "diversão",
      aliases: ["escolha"],
      arguments: true,
      description: {
        content: "O bot irá escolher entre duas coisas.",
        usage: "choose 1 2",
        examples: ["Megumin Naruto"]
      },
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    })
  }
  
  async exec({ message, args }) {
    if (!args[0]) return message.say(true, 'você precisa dizer a primeira escolha.');  
    if (!args[1]) return message.say(true, 'você precisa dizer a segunda escolha.');  

    const itens = [args[0], args[1]]
    const random = itens[Math.floor(Math.random() * itens.length)];

    message.say(false, `> Eu escolho: \`${random}\``);
  }
}