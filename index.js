const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates
],
partials: [Partials.Channel] });
const token = require('./token.json');
const serverGuild = '967045453164212284';
const channelID = '967045453164212287'

//const { options, guild, member } = interaction;

let notificationChannel;


client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    //let notificationChannel = client.guilds.cache.get(channelID);
});

client.on('messageCreate', msg => {
    notificationChannel = msg.channel;
});

client.on('voiceStateUpdate', (oldVoiceState, newVoiceState) => { // Listeing to the voiceStateUpdate event
    if (newVoiceState.channel) { // The member connected to a channel.
        console.log(`${newVoiceState.member.user.tag} connected to ${newVoiceState.channel.name}.`);
        notificationChannel.send(`${newVoiceState.member.user.tag} connected to ${newVoiceState.channel.name}.`);
    } else if (oldVoiceState.channel) { // The member disconnected from a channel.
        console.log(`${oldVoiceState.member.user.tag} disconnected from ${oldVoiceState.channel.name}.`)
        notificationChannel.send(`${oldVoiceState.member.user.tag} disconnected from ${oldVoiceState.channel.name}.`);
    };
});

client.login(token.token);