const Command = require('../../structures/Command')

module.exports = class PingCommand extends Command {
  constructor() {
    super("ping", {
      aliases: ["ms"],
      category: "informações",
      description: {
        content: "Veja a latência da api.",
        usage: "ping",
      },
      userPerm: ["SEND_MESSAGES"],
      clientPerm: ["SEND_MESSAGES"],
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    });
  }

  exec({ message }) {
    message.say(true, `:ping_pong: \`${this.client.ws.ping}\`ms`);
  }
};
