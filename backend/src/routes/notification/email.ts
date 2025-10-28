import { Router } from "express"
import { authorizeRequest } from "../../middleware"
import { getOtp, setOtp } from "../../utils/redis"
// import { sendOtp } from "../../utils/nodemailer"
import prisma from "../../utils/prisma"
import { sendOtp } from "../../utils/resend"


export const emailRouter = Router()




emailRouter.get("/health", (req, res) => {
    res.json({
        msg: "Healthy"
    })
})


// OTP
// Add Email


// Notification routes
emailRouter.post("/", authorizeRequest, async (req, res) => {

    try {
        // return res
        const publicKey = req.user?.publicKey as string
        const { email } = req.body
        if (!email) {
            return res.status(500).json({
                error: "Invalid Parameters!"
            })
        }
        const otp = await setOtp(email)
        if (!otp) {
            return res.status(500).json({
                msg: "Internal Server Error!"
            })
        }
        const otpRes = await sendOtp(email, otp)
        res.json({
            msg: "Otp Generated sent to your email!"
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error!"
        })
    }
})

emailRouter.post("/verify", authorizeRequest, async (req, res) => {
    try {
        const publicKey = req.user?.publicKey as string
        const { email, otp } = req.body
        if (!email) {
            return res.status(500).json({
                error: "Invalid Parameters!"
            })
        }
        const otpFetchRes = await getOtp(email)
        if (!otpFetchRes) {
            return res.status(500).json({
                msg: "Otp not found!"
            })
        }
        if (otp !== otpFetchRes) {
            return res.status(500).json({
                msg: "Wrong Otp!"
            })
        }
        // Add email to DB
        const emailRes = await prisma?.notification.create({
            data: {
                publicKey,
                notificationId: email,
                type: "EMAIL"
            }
        })

        res.json({
            msg: "Otp Verified! Email Setup Successful!"
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error while adding email!"
        })
    }

})
