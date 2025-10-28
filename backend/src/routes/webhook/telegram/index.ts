import { Router } from "express";
import { telegramBot } from "../../../utils/telegram";
import { deletePublicKey, getPublicKey } from "../../../utils/redis";
import prisma from "../../../utils/prisma";





export const tgRouter = Router()


tgRouter.post("/", async (req, res) => {
    const update = req.body
    try {
        console.log("Message from the telegram agent cast : ", update)
        const textMessage: string = update.message.text
        console.log("Text msg and uuid : ", textMessage, textMessage.split(" ")[1])
        if (textMessage.includes("/verify")) {
            const uuid = textMessage.split(" ")[1]
            console.log("Uuid : ", uuid)
            if (uuid) {
                console.log("Here in the tg webhook")
                const publicKey = await getPublicKey(uuid)
                const tgChatId: number = update.message.chat.id
                console.log("publicKey and tgChatid : ", publicKey, tgChatId)
                if (publicKey && tgChatId) {
                    const tgIdExists = await prisma?.notification.findFirst({
                        where: {
                            publicKey,
                            notificationId: tgChatId.toString(),
                        }
                    })
                    if (tgIdExists === null) {
                        const updateRes = await prisma?.notification.create({
                            data: {
                                publicKey,
                                notificationId: tgChatId.toString(),
                                type: "TELEGRAM"
                            }
                        })
                        await telegramBot.sendMessage(tgChatId, "Telegram Notification is now setup successfully!")
                        console.log("TG credential Updated : ", updateRes)
                    }
                    else {
                        console.log("TG Credential Exists already!")
                    }
                    await deletePublicKey(uuid)
                }
            }
        }

        telegramBot.processUpdate(update)

        res.sendStatus(200)
    } catch (error) {
        const tgChatId = update.message.chat.id
        await telegramBot.sendMessage(tgChatId, "There was some error while processing your request! \nPlease try again after some time! \n\nThank You \nTeam ChainCast")
        console.log("Error while processing the tg webhook request : ", error)
        res.sendStatus(200)
    }
})