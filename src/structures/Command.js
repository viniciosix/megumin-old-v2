module.exports = class Command {
  constructor(name, options) {
    this.client = null;
    this.help = {
      name: name || console.error('Todos os comandos devem conter seus respectivos nomes!'),
      desc: options.description.content || 'descrição não definida',
      usage: options.description.usage || 'utilização não definida',
      examples: options.description.examples || [name],
      category: options.category || 'random'
    };
    this.config = {
      aliases: options.aliases || [],
      disabled: options.disabled || false,
      maintenance: options.maintenance || false,
      arguments: options.arguments || false,
    };
    this.requirements = {
      ownerOnly: options.ownerOnly || false,
      guildOnly: options.guildOnly || false,
      userPerm: options.userPerm || [],
      clientPerm: options.clientPerm || [],
    };
    this.limits = {
      rateLimit: options.limits.rateLimit || 4,
      cooldown: options.limits.cooldown || 3e4
     };
  }

  exec({ message, args, database }) {}
};
