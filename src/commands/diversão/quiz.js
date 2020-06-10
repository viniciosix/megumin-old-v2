const Command = require('../../structures/Command');
const Quiz = require('../../util/assets/questions');
const tempo = new Set();

module.exports = class QuizCommand extends Command {
  constructor() {
    super('quiz', {
      catagory: "diversão",
      // maintenance: true,
      description: {
        content: "Um jogo de perguntas",
        usage: "quiz"
      },
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    });
  }

  async exec({ message, args }) {
    const { question, answers } = Quiz[Math.floor(Math.random() * Quiz.length)];
    const filter = response => {
	    return answers.includes(response.content.toLowerCase());
    };

    message.channel.send(`> ${question}`).then(() => {
	    message.channel.awaitMessages(
        response => { return answers.includes(response.content.toLowerCase()); },
        { max: 1, time: 20000, errors: ['time'] }
      ).then(collected => {
			    message.channel.send(`\`${collected.first().author.tag}\` acertou.`);
        this.client.emit('message', (message));
		    })
		    .catch(collected => {
			    message.channel.send('Ninguém respondeu e o `quiz` acabou.');
	    	});
    });
  }
}

