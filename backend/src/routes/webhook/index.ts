import { Router } from "express"
import { heliusRouter } from "./helius"
import { tgRouter } from "./telegram"



export const webhookRouter = Router()




webhookRouter.use("/helius", heliusRouter)
webhookRouter.use("/telegram", tgRouter)
// TG ROuter

