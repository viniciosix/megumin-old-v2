const Command = require("../../structures/Command");
const { readdirSync } = require("fs");

module.exports = class HelpCommand extends Command {
  constructor() {
    super("help", {
      aliases: ["ajuda"],
      category: "informações",
      // maintenance: true,
      description: {
        content: "Veja todos os meus comandos.",
        usage: "help [comando]",
        examples: ["ping"]
      },
      userPerm: ["SEND_MESSAGES"],
      clientPerm: ["SEND_MESSAGES", "EMBED_LINKS"],
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    });
  }

  exec({ message, args, database }) {
    if (!args[0]) {
      const categories = readdirSync("./src/commands/");
      const embed = new this.client.utils.embed(message.author)
        .setAuthor("Meu nome é Megumin! um demônio carmesim e uma Maga Explosiva do nível avançado, com uma poderosa magia ofensiva.")
        .setDescriptionArray([[
          "> Prefixos:",
          ">  - padrão: `m.` ou `meg `",
          `>  - personalizado: ${database.guild.prefix === "m." ? "**não definido**" : `\`${database.guild.prefix}\``}`
        ]])
        .setThumbnail(this.client.user.displayAvatarURL({ format: "png" }))
        .setFooter(
          `"${database.guild.prefix}help [comando]" para mais informações!`
        );

      for (const category of categories) {
        try {
          const cmds = this.client.commands.filter(c => c.help.category === category)
          embed.addField(
            `${category.replace(/^(\b\w)/gi, s => s.toUpperCase())} [${cmds.size}]`,
            cmds.map(c => `\`${c.help.name}\``).join(", ")
          );
        } catch {
          embed.addField("Error", "Erro ao carregar esta categoria!");
        }
      }

      message.say(false, { embed });
    } else {
      try {
        const cmd = this.client.commands.find(c => c.help.name === args[0] || c.config.aliases.includes(args[0]));
        const embed = new this.client.utils.embed(message.author)
          .setTitle(`${cmd.help.usage.replace("a!", "") || ""}`)
          // .setDescription(cmd.help.desc || "\u2007")
          .setDescriptionArray([
            [
              `▫ Descrição: \`${cmd.help.desc}\``,
              `▫ Utilização: \`${cmd.help.usage}\``,
              `▫ Exemplos:\n${cmd.help.examples.map(a => ` - \`${database.prefix}${cmd.help.name} ${a}\``).join('\n')}`
            ], [
              `▫ Categoria: ${cmd.help.category}`,
              `▫ Sinônimo: ${cmd.config.aliases.map(a => `\`${a}\``).join(", ") || "?"}`
            ]
          ]).setThumbnail(this.client.user.displayAvatarURL());
        // if (cmd.config.aliases) embed.addField('❯ Sinônimo', `\`${cmd.config.aliases.join('`, `')}\``, true);
        // if (cmd.help.examples) embed.addField('❯ Exemplos', `${cmd.help.name} ${cmd.help.examples.join(`\n${cmd.help.name} `)}`, false);
        
        message.say(false, { embed });
      } catch (err) {
        console.error(err);
        return message.say(true, "não foi possível encontrar este comando!");
      }
    }
  }
};
