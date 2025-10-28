import { Resend } from "resend";
import { otpEmailTemplate } from "../nodemailer/htmlTemplate";
import "dotenv/config"

export const resend = new Resend(process.env.RESEND_API_KEY as string)



export async function sendOtp(receipient : string, otp : number) {
    try {
        const res = await resend.emails.send({
            from :  `Agent Cast <onboarding@resend.dev>`,
            to : receipient,
            subject : "OTP For ChainCast!",
            html : otpEmailTemplate(receipient, `${otp}`)
        })
        console.log("Resend res : ", res)
        return res
    } catch (error) {
        console.log(error)
        return null
    }
}