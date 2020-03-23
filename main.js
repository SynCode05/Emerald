const { CommandoClient, SQLiteProvider } = require("discord.js-commando");
const config = require("./config.json");
const path = require("path");
const sqlite = require("sqlite");

const client = new CommandoClient({
	commandPrefix: config.defaultPrefix,
	nonCommandEditable: false,
	owner: config.owners
});

client.setProvider(sqlite.open(path.join(__dirname, "storage.db")).then(db => new SQLiteProvider(db)));

client.registry.registerDefaultTypes();
client.registry.registerDefaultGroups();
client.registry.registerDefaultCommands();

client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity("with Commando");
});

client.on("error", console.error);

client.login(config.token);