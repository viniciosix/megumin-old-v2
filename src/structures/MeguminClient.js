const { Client, Collection } = require("discord.js");
const { readdir, readdirSync } = require("fs");
const mongoose = require("../util/database/mongoose");

module.exports = class MeguminClient extends Client {
  constructor(options = {}) {
    super(options);
    
    this.commands = new Collection();
    this.prefixes = ["m.", "meg "];
    this.owners = ["676530990960869396", "336905723621670914", "515903666360942594"];
    this.utils = require("../util/functions/");
    this.database = require("../util/database/models");
    mongoose.init();
  }

  load(token) {
    super.login(token)
      .then(() => console.log("[Megumin] Conectado com o Discord."))
      .catch(console.error);
    
    this.initCommands();
    this.initEvents();
  }
  
  initCommands() {
    for (const paths of readdirSync("src/commands/")) {
      readdir(`src/commands/${paths}/`, (e, f) => {
        if (e) throw new Error(e.stack);
        for (const file of f.filter(c => c.endsWith(".js"))) {
          const cmd = new (require(`../commands/${paths}/${file}`))();
          cmd.client = this;
          this.commands.set(cmd.help.name, cmd);
        }
      });
    }
    console.log("[COMANDOS] Todos os comandos foram carregados.");
  }
  
  initEvents() {
    readdir("src/events/", (e, f) => {
      if (e) throw new Error(e.stack);
      for (const file of f.filter(e => e.endsWith(".js"))) {
        const evt = new (require(`../events/${file}`))();

        evt.client = this;
        this.on(file.split(".")[0], (...args) => evt.exec(...args));
      }
    });
    console.log("[EVENTOS] Todos os eventos foram carregados.");
  }
};
