/* Dispoll generated with create-discord-bot CLI */
const Discord = require('discord.js')

const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const config = require('./config')

const digimojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']
const PREFIX = '/dispoll'

const client = new Discord.Client()
client.on('ready', () => {
    console.log('Bot is ready!')
})
client.login(config.discordClientID)

function buildChoices(choices) {
    let choicesStringValue = ''
    if (choices && choices.length > 0) {
        choices.filter(c => c.length > 0)
            .forEach((choice, iterator) => {
                choicesStringValue += `${digimojis[iterator]} ${choice}\n`
            })
    } else {
        choicesStringValue += '✅ Yes\n❌ No'
    }
    return choicesStringValue
}

function buildEmbed(question, choices) {
    console.log(question, choices)
    return new Discord.RichEmbed()
        .setTitle('A new poll arrived!')
        .setColor('#00AE86')
        .addField(question, buildChoices(choices))
}

client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.indexOf(PREFIX) === -1) return
    const args = message.content.slice(PREFIX.length).trim().split(';')
    try {
        const question = args[0]
        if(!question)
            return message.channel.send('Usage: `/dispoll Question ; Answer 1 ; Answer 2; Answer ...`')
        args.shift()
        message.channel.send(buildEmbed(question, args)).then(() => {
            message.delete(200)
        })
    } catch (err) {
        console.log(err)
    }
})

io.on('connection', socket => {
    console.log('Socket connected !')
    socket.on('newPoll', poll => {
        console.log('Received new poll', poll)
        try {
            client.channels.get(poll.discordID).send(buildEmbed(poll.question, poll.choices))
        } catch (error) {
            console.log(error)
        }
    })
})
http.listen(3333)