import TelegramBot from "node-telegram-bot-api"

const telegramToken = process.env.TELEGRAM_BOT_TOKEN || ""
export let telegramBot = new TelegramBot(telegramToken)


const webhookUrl = process.env.NODE_ENV === "development" ? process.env.DEV_BACKEND_URL as string : process.env.PROD_BACKEND_URL as string
console.log("TG whUrl : ",webhookUrl,process.env.NODE_ENV,process.env.DEV_BACKEND_URL,process.env.PROD_BACKEND_URL)
export const startTelegramWebhook = async (id? : string, data? : any)=>{
    console.log("Listening for messages telegram agent cast")
    await telegramBot.setWebHook(`${webhookUrl}`)
}



export async function deleteWebhook() {
  try {
    const res = await telegramBot.deleteWebHook()
    console.log("Telegram webhook deleted : ",res)
  } catch (err :any) {
    console.error("Failed to delete webhook:", err.message);
  }
}
