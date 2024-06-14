//Importa index.js
const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const index = require("./index.js");
const dataManager = require("./dataManager");

//Lee los comandos y ejecuta otras funciones en base a su contenido
function leerMensaje(message, mode) {
	if (mode == 1) {
		const comando = message.content.substring(5);
		const channel = index.client.channels.cache.get(message.channelId);

		switch (comando) {
			default:
				channel.send("Mis funcionalidades son accesibles usando `!t3c`, ¡No te olvides! También puedes ver todos los comandos con `!t3c help`");
				break;
			case "help":
				help(channel);
				break;
		}
	} else if (mode == 2) {
		if (message.length == 8) {
			dataManager.requestAll();
			menu(message.channel, "base");
		} else {
			const comando = message.content.substring(9);
			const channel = index.client.channels.cache.get(message.channelId);

			dataManager.requestAll(comando);
			menu(message.channel, "base");
		}
	}
}

//Lee las interacciones y ejecuta otras funciones en base a su contenido
function leerInteraccion(interaction) {
	//console.log(interaction.user.username);
	//console.log(interaction.customId);
	if (interaction.customId == "volver") {
		interaction.message.delete();
		menu(interaction.channel, "base");
	}

	if (interaction.customId == "perfil") {
		interaction.message.delete();
		menu(interaction.channel, "perfil");
	}

	if (interaction.customId == "equipo") {
		interaction.message.delete();
		menu(interaction.channel, "equipo");
	}

	if (interaction.customId == "torneo") {
		interaction.message.delete();
		menu(interaction.channel, "torneo");
	}
}

//Explica los demas comandos
function help(channel) {
	channel.send("Los comandos disponibles son los siguientes: " +
		"\n `!teams3c` -> Abre un menú en el que puedes consultar todos los jugadores, equipos y torneos" +
		"\n `!teams3c [nombre]` -> Abre un menú en el que puedes consultar todos los jugadores, equipos y torneos en base al nombre que has usado para buscar");
}

//Comando que va creando los diferentes menus (embeds con botones) en base a la variable estado que se le pase
function menu(channel, estado) {
	if (estado == "base") {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('perfil')
					.setLabel('Perfiles')
					.setStyle(ButtonStyle.Primary)
					.setEmoji("👤"),
				new ButtonBuilder()
					.setCustomId('equipo')
					.setLabel('Equipos')
					.setStyle(ButtonStyle.Primary)
					.setEmoji("🛡"),
				new ButtonBuilder()
					.setCustomId('torneo')
					.setLabel('Torneos')
					.setStyle(ButtonStyle.Primary)
					.setEmoji("⚔"),
			);

		const attachment = new AttachmentBuilder('t3c.png', { name: 't3c.png' })
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Bienvenido a Teams3C')
			.setImage('attachment://t3c.png')
			.setDescription('¿Que quieres hacer?');

		channel.send({ ephemeral: true, embeds: [embed], components: [row], files: [attachment] });
	} else if (estado == "perfil") {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('volver')
					.setLabel('Volver')
					.setStyle(ButtonStyle.Primary)
					.setEmoji("🔙"),
			);

		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Listado de jugadores')
			.setDescription('Nombre y descripción de los equipos. Puedes filtrar por nombre usando el comando `!teams3c nombre`');

		if (dataManager.loadedPlayers.length > 0) {
			dataManager.loadedPlayers.forEach(function (array) {
				//console.log(array[0] + ", " + array[1])
				if (array[1] == null || array[1] == "") {
					embed.addFields(
						{ name: array[0], value: "Sin descripción" }
					)
				} else {
					embed.addFields(
						{ name: array[0], value: "" + array[1] }
					)
				}
			});
		} else {
			embed.addFields(
				{ name: "No se han encontrado resultados", value: "Escribe `!t3c help` para ver los comandos" }
			)
		}

		channel.send({ ephemeral: true, embeds: [embed], components: [row] });
	} else if (estado == "equipo") {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('volver')
					.setLabel('Volver')
					.setStyle(ButtonStyle.Primary)
					.setEmoji("🔙"),
			);

		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Listado de equipos')
			.setDescription('Nombre y descripción de los equipos. Puedes filtrar por nombre usando el comando `!teams3c nombre`');

		if (dataManager.loadedTeams.length > 0) {
			dataManager.loadedTeams.forEach(function (array) {
				if (array[1] == null || array[1] == "") {
					embed.addFields(
						{ name: array[0], value: "Sin descripción" }
					)
				} else {
					embed.addFields(
						{ name: array[0], value: "" + array[1] }
					)
				}
			});
		} else {
			embed.addFields(
				{ name: "No se han encontrado resultados", value: "Escribe `!t3c help` para ver los comandos" }
			)
		}

		channel.send({ ephemeral: true, embeds: [embed], components: [row] });
	} else if (estado == "torneo") {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('volver')
					.setLabel('Volver')
					.setStyle(ButtonStyle.Primary)
					.setEmoji("🔙"),
			);

		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Listado de torneos')
			.setDescription('Nombre y descripción de los torneos. Puedes filtrar por nombre usando el comando `!teams3c nombre`');

		if (dataManager.loadedTournaments.length > 0) {
			dataManager.loadedTournaments.forEach(function (array) {
				if (array[1] == null || array[1] == "") {
					embed.addFields(
						{ name: array[0], value: "Sin descripción" }
					)
				} else {
					embed.addFields(
						{ name: array[0], value: "" + array[1] }
					)
				}
			});
		} else {
			embed.addFields(
				{ name: "No se han encontrado resultados", value: "Escribe `!t3c help` para ver los comandos" }
			)
		}

		channel.send({ ephemeral: true, embeds: [embed], components: [row] });
	}
}

exports.leerMensaje = leerMensaje;
exports.leerInteraccion = leerInteraccion;
exports.menu = menu;