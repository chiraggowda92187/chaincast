

import { Router } from "express";
import { authorizeRequest } from "../../middleware";
import { TransactionType } from "@prisma/client";
import prisma from "../../utils/prisma";


const dataRouter = Router()


dataRouter.get("/health", (req, res) => {
    res.json({
        msg: "Healthy"
    })
})


dataRouter.get("/transactions", authorizeRequest, async (req, res) => {
    try {
        const publicKey = req.user?.publicKey
        if (!publicKey) {
            return res.status(401).json({
                error: "Not authorized!"
            })
        }
        const type = req.query.type
        if (type && !Object.values(TransactionType).includes(type as TransactionType)) {
            return res.status(500).json({
                error: "Improper Type!"
            })
        }
        // console.log("Type : ", ...(type ? { type : type as TransactionType } : {}))
        const data = await prisma?.transaction.findMany({
            where: {
                publicKey: publicKey,
                ...(type ? { type : type as TransactionType } : {})
            }
        })
        const serializedData = data?.map((currData)=>{
            return {
                ...currData,
                // Process Amount to its related digits (ex. if sol amount = amount / 1e9 , tokens, nfts etc )
                amount : currData.amount
            }
        })
        return res.json({
            transactions: serializedData
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Internal server error!"
        })
    }
})

export default dataRouter