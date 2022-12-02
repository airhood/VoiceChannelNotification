const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates
],
partials: [Partials.Channel] });
const setting = require('./setting.json');
const token = setting.token;
const channelID = setting.channelID;

let notificationChannel;


client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    notificationChannel = client.channels.cache.get(channelID);
});

client.on('messageCreate', msg => {
    notificationChannel = msg.channel;
});

client.on('voiceStateUpdate', (oldVoiceState, newVoiceState) => { // Listeing to the voiceStateUpdate event
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    if (newVoiceState.channel) { // The member connected to a channel.
        console.log(`${dateTime} ${newVoiceState.member.user.tag} connected to ${newVoiceState.channel.name}.`);
        notificationChannel.send(`${dateTime} ${newVoiceState.member.user.tag} connected to ${newVoiceState.channel.name}.`);
    } else if (oldVoiceState.channel) { // The member disconnected from a channel.
        console.log(`${dateTime} ${oldVoiceState.member.user.tag} disconnected from ${oldVoiceState.channel.name}.`)
        notificationChannel.send(`${dateTime} ${oldVoiceState.member.user.tag} disconnected from ${oldVoiceState.channel.name}.`);
    };
});

client.login(token);