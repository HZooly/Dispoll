import * as Discord from 'discord.js'
// tslint:disable-next-line: no-var-requires
require('dotenv').config()

import Global from './utils/global'

import Emojis from './utils/emojis'

const Dispoll = new Discord.Client()
const PREFIX = process.env.PREFIX
const DIGIMOJIS = Emojis.digits

Dispoll.on('ready', () => {
  Dispoll.user.setActivity('/dispoll for help...')
})

const buildChoices = (choices: string[]) => {
  let choicesStringValue = ''
  if (choices && choices.length > 0) {
    choices.filter((c: string) => c.length > 0)
      .forEach((choice, iterator) => {
        choicesStringValue += `${DIGIMOJIS[iterator]} ${choice}\n`
      })
  } else {
    choicesStringValue += `${Emojis.yes} ${Emojis.no}`
  }
  return choicesStringValue
}

const buildEmbed = (question: string, choices: string[], author: string) => {
  return new Discord.RichEmbed()
    .setDescription(`🗒 Poll from ${Global.mentionUser(author)}`)
    .setColor('#00AE86')
    .addField(`**${question}**`, buildChoices(choices))
}

const react = async (poll: Discord.Message, args: string[]) => {
  if (args.length === 0) {
    await poll.react(Emojis.yes)
    await poll.react(Emojis.no)
  } else {
    args = args.filter((arg: string) => arg.length > 0)
    for (let i = 0; i < args.length; i++) {
      await poll.react(DIGIMOJIS[i])
    }
  }
}

const addFooter = (question: string, args: string[], authorID: string, id: string) => {
  return buildEmbed(question, args, authorID).setFooter(`ID: ${id}`)
}

Dispoll.on('message', (message) => {
  if (message.author.bot || message.content.indexOf(PREFIX) === -1) return
  const args = message.content.slice(PREFIX.length).trim().split(';')
  try {
    const question = args[0]
    if (!question)
      return message.channel.send(`Usage: \`${process.env.PREFIX}  Question ; Choice 1 ; Choice 2 ; Choice 3 ...\``)
    args.shift()
    message.channel.send(buildEmbed(question, args, message.author.id)).then((poll: Discord.Message) => {
      poll.edit(addFooter(question, args, message.author.id, poll.id))
      react(poll, args)
      message.delete(200)
    })
  } catch (err) {
    console.log(err)
  }
})

Dispoll.login(process.env.DISCORD_TOKEN)
