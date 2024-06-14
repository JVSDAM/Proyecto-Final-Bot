//Importa las librerias necesarias de discord.js
const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, EmbedBuilder, AttachmentBuilder } = require('discord.js');
//Importa los metodos de comandos.js
const chatManager = require("./chatManager.js");
const dataManager = require("./dataManager.js");

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	]
});

//Manda un log cuando el bot esta listo
client.on('ready', (bot) => {
	console.log(`Bot: ${bot.user.username}\nStatus: ${bot.presence.status}`);
});

//Captar mensajes
client.on("messageCreate", (message) => {
	if (message.author.bot) return false;
	//const channel = client.channels.cache.get(message.channelId);

	if (message.content.substring(0, 5) == "!t3c ") {
		chatManager.leerMensaje(message, 1);
	}

	if (message.content.substring(0, 8) == "!teams3c") {
		chatManager.leerMensaje(message, 2);
	}
});

//Captar interacciones
client.on("interactionCreate", async interaction => {
	chatManager.leerInteraccion(interaction);
});

client.login("MTI0MjkxNjEwODcxMzk4NDA2MQ.GlSYYe._ExTtS4WKYUfO9YTqJPOTIEFNo6MCDJjVq_z88");

exports.client = client;