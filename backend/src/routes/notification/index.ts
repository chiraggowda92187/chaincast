import { Router } from "express"
import { emailRouter } from "./email"
import { tgRouter } from "./telegram"
import { authorizeRequest } from "../../middleware"
import prisma from "../../utils/prisma"


export const notificationRouter = Router()




notificationRouter.use("/email", emailRouter)
notificationRouter.use("/telegram", tgRouter)
notificationRouter.get("/", authorizeRequest, async (req, res)=>{
    try {
        const publicKey = req.user?.publicKey
        const notifications = await prisma?.notification.findMany({
            where : {
                publicKey
            }
        })
        res.json({
            notifications : notifications
        })
    } catch (error) {
        res.status(500).json({
            error : "Internal Server Error!"
        })
    }
})

