/* Dispoll generated with create-discord-bot CLI */
const Discord = require('discord.js')

const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const config = require('./config')

const digimojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

const client = new Discord.Client()
client.on('ready', () => {
    console.log('Bot is ready!')
})
client.login(config.discordClientID);

function buildChoices(choices) {
    let choicesStringValue = '';
    choices.forEach((choice, iterator) => {
        choicesStringValue += `${digimojis[iterator]} ${choice}\n`
    })
    return choicesStringValue;
}

function buildEmbed(question, choices) {
    return new Discord.RichEmbed()
        .setTitle('A new poll arrived!')
        .setColor('#00AE86')
        .addField(question, buildChoices(choices))
}

io.on('connection', socket => {
    console.log('Socket connected !')
    socket.on('newPoll', poll => {
        console.log('Received new poll', poll)
        try {
            client.channels.get(poll.discordID).send(buildEmbed(poll.question, poll.choices))
        } catch(error) {
            console.log(error)
        }
    })
})
http.listen(3333)