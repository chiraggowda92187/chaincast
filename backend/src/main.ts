import { app } from "."
import { connectRedisclient, redisClient } from "./utils/redis"
import { deleteWebhook, startTelegramWebhook } from "./utils/telegram"
import { startWorker } from "./worker"
import { startWss } from "./wss"

export async function startServer() {


    // Listen to TG Webhook for verification req's
    // Start redis Client if not started
    await connectRedisclient()

    // Start worker
    const httpExpressServer = app.listen(3000, () => {
        console.log("Server running on port 3000")
    })
    startWss(httpExpressServer)
    await startTelegramWebhook()

    process.on("SIGINT", async () => {
        console.log("⏹️ Shutting down...");
        await deleteWebhook();
        process.exit(0);
    });

    process.on("SIGTERM", async () => {
        console.log("🛑 Termination signal received...");
        await deleteWebhook();
        process.exit(0);
    });

    process.on("exit", async () => {
        await deleteWebhook();
    });
}

