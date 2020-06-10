const app = require("express")();

app.get("/", (request, response) => {
  response.sendStatus(2000)
});

app.listen(process.env.PORT);
setInterval(() => {
  require("http").get(`http://aqua-v2.glitch.me/`);
}, 280000);

const Client = require("./src/structures/MeguminClient");
const client = new Client({ disableMentions: "everyone" });
client.load(process.env.TOKEN);
