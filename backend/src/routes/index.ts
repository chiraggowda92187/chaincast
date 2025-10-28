import { Router } from "express"
import { authRouter } from "./auth"
import { webhookRouter } from "./webhook"
import { notificationRouter } from "./notification"
import dataRouter from "./data"


export const mainRouter = Router()




mainRouter.use("/api/auth", authRouter)
mainRouter.use("/api/webhook", webhookRouter)
mainRouter.use("/api/notification", notificationRouter)
mainRouter.use("/api/data", dataRouter)