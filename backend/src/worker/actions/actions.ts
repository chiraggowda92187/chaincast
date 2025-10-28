import { HeliusPayLoad } from "../../utils/getData"
import { mailTransporter } from "../../utils/nodemailer"
import { resend } from "../../utils/resend"
import { telegramBot } from "../../utils/telegram"
import { dataEmailTemplate } from "./dataEmailTemplate"
import { formatTransactionMessageToTgMsg } from "./tgFormatMessage"

export const sendEmail = async (email: string, data: any) => {
    try {
        // const res = await mailTransporter.sendMail({
        //     from: process.env.EMAIL_ID,
        //     to: email,
        //     subject: "New Transaction Alert from ChainCast!",
        //     html: dataEmailTemplate(data)
        // })
        const res = await resend.emails.send({
            from: `Agent Cast <onboarding@resend.dev>`,
            to: email,
            subject: "New Transaction Alert from ChainCast!",
            html: dataEmailTemplate(data)
        })
        console.log("Email Sent Successfully! : ",res)
    } catch (error) {
        console.log("Error while sending email notification : ", error)
    }
}


export const sendTelegramMessage = async (id: string, data: any) => {
    try {
        const tgMessage = formatTransactionMessageToTgMsg(data)

        const tgMsgRes = await telegramBot.sendMessage(id, tgMessage)

        console.log("Telegram Update sent. : ", tgMsgRes)
        
    } catch (error) {
        console.log("Error while sending tg notification : ", error)
    }
}