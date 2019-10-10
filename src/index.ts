import * as Discord from 'discord.js'
// tslint:disable-next-line: no-var-requires
require('dotenv').config()

import Global from './utils/global'

import Emojis from './utils/emojis'

const Dispoll = new Discord.Client()
const CMD_POLL: string = process.env.CMD_POLL
const DIGIMOJIS: string[] = Emojis.digits

Dispoll.on('ready', () => {
  Dispoll.user.setActivity('/dispoll for help...')
})

const buildChoices = (choices: string[]): string => {
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

const buildEmbed = (question: string, choices: string[], author: string): Discord.RichEmbed => {
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

const addFooter = (question: string, args: string[], authorID: string, id: string): Discord.RichEmbed => {
  return buildEmbed(question, args, authorID).setFooter(`ID: ${id}`)
}

const buildReactionsList = (reactions: Discord.Collection<string, Discord.MessageReaction>) => {
  let res = ''
  reactions.forEach((reaction) => {
    res += `${reaction.emoji} [${reaction.count - 1}]: `
    reaction.users.forEach((user) => {
      if (!user.bot) res += `${Global.mentionUser(user.id)} `
    })
    res += '\n'
  })
  return res
}

Dispoll.on('message', async (message) => {
  if (message.author.bot) return
  const content: string = message.content
  if (content.indexOf(CMD_POLL) !== -1) {
    const reactArgs = content.slice(CMD_POLL.length).trim().split(' ')
    if (typeof parseInt(reactArgs[0], 10) === 'number' && reactArgs.length === 1) {
      try {
        const lastMessage = await message.channel.fetchMessage(reactArgs[0])
        const reactions = lastMessage.reactions
        return message.channel.send(buildReactionsList(reactions)).then((_) => {
          message.delete(200)
        })
      } catch (err) {
        console.log(err)
      }
    }
    const args = content.slice(CMD_POLL.length).trim().split(';')
    try {
      const question = args[0]
      if (!question)
        return message.channel.send(`Usage: \`${process.env.CMD_POLL}  Question ; Choice 1 ; Choice 2 ; Choice 3 ...\``)
      args.shift()
      message.channel.send(buildEmbed(question, args, message.author.id)).then((poll: Discord.Message) => {
        poll.edit(addFooter(question, args, message.author.id, poll.id))
        react(poll, args)
        message.delete(200)
      })
    } catch (err) {
      console.log(err)
    }
  }
})

Dispoll.login(process.env.DISCORD_TOKEN)
