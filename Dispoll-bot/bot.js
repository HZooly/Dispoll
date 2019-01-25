/* Dispoll generated with create-discord-bot CLI */
const Discord = require('discord.js')

const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const config = require('./config')

const client = new Discord.Client()
client.on('ready', () => {
    console.log('Bot is ready!')
})
client.login(config.discordClientID);

io.on('connection', socket => {
    console.log('Socket connected !')
    socket.on('newPoll', poll => {
        console.log('Received new poll', poll)
        client.channels.get(poll.discordID).send(poll.question)
    })
})
http.listen(3333)