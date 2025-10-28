import nodemailer from "nodemailer"
import "dotenv/config"
import { otpEmailTemplate } from "./htmlTemplate"

export const mailTransporter = nodemailer.createTransport({
    // service : "gmail", // For dev purposes only
    host : "smtp.gmail.com",
    port : 465,
    secure : true,
    auth : {
        user : process.env.EMAIL_ID,
        pass : process.env.EMAIL_APP_PASS
    }
})




export async function sendOtp(receipient : string, otp : number) {
    try {
        const res = await mailTransporter.sendMail({
            from : process.env.EMAIL_ID,
            to : receipient,
            subject : "OTP For ChainCast!",
            html : otpEmailTemplate(receipient, `${otp}`)
        })
        return res
    } catch (error) {
        console.log(error)
        return null
    }
}