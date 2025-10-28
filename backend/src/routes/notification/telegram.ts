import { Router } from "express"
import { authorizeRequest } from "../../middleware"
import { getOtp, setOtp, setUuid } from "../../utils/redis"
import { sendOtp } from "../../utils/nodemailer"
import prisma from "../../utils/prisma"


export const tgRouter = Router()




tgRouter.get("/health", (req, res) => {
    res.json({
        msg: "Healthy"
    })
})


// OTP
// Add Email


// Notification routes
tgRouter.post("/", authorizeRequest, async (req, res) => {

    try {
        // return res
        const publicKey = req.user?.publicKey as string
        if (!publicKey) {
            return res.status(500).json({
                error: "Invalid Parameters!"
            })
        }
        const uuid = await setUuid(publicKey)
        if (!uuid) {
            return res.status(500).json({
                msg: "Internal Server Error!"
            })
        }
        res.json({
            msg: "UUID generated successfully!",
            uuid
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error!"
        })
    }
})

tgRouter.post("/verify", authorizeRequest, async (req, res) => {
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
