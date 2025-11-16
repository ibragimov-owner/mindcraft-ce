import chalk from "chalk";

(async (bot) => {

    // --- SETTINGS ---
    const config = {
        prefix: "!",
        version: "1.0.0",
    };

    // --- LOGGER ---
    const log = {
        info: (...msg) => console.log(chalk.blue("[INFO]"), ...msg),
        success: (...msg) => console.log(chalk.green("[SUCCESS]"), ...msg),
        error: (...msg) => console.log(chalk.red("[ERROR]"), ...msg),
    };

    // --- READY EVENT ---
    bot.on("ready", () => {
        console.clear();
        console.log(chalk.magenta(`
╔══════════════════════════════════╗
║     🤖 Bot Started Successfully  ║
║         Version: ${config.version}          ║
╚══════════════════════════════════╝
        `));

        log.success("Bot is online.");
    });

    // --- BUILT-IN COMMANDS ---
    const commands = {
        ping: (msg) => msg.reply("🏓 Pong!"),
        help: (msg) =>
            msg.reply(
                "📌 Commands:\n" +
                "`!ping` — Test bot\n" +
                "`!help` — Show this list"
            ),
    };

    // --- MESSAGE HANDLER ---
    bot.on("messageCreate", (msg) => {
        if (!msg.content.startsWith(config.prefix)) return;

        const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
        const cmd = args.shift().toLowerCase();

        if (!commands[cmd]) return;

        try {
            commands[cmd](msg, args);
        } catch (err) {
            log.error("Command error:", err);
            msg.reply("❌ Something went wrong.");
        }
    });

})();
