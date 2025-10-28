import { Router } from "express"
import { getData, HeliusPayLoad } from "../../../utils/getData"
import prisma from "../../../utils/prisma"
import { redisClient } from "../../../utils/redis"
import { sendClientMessage } from "../../../wss"

export const heliusRouter = Router()


const queueKey = process.env.QUEUE_KEY || ""


heliusRouter.get("/health", (req, res) => {
    res.json({
        msg: "healthy"
    })
})


heliusRouter.post("/", async (req, res) => {
    try {
        const payload: HeliusPayLoad = req.body
        const data = await getData(req.body)

        console.log("New Webhook Hit : ")
        console.log("Payload : ", payload)

        const senderPromise = prisma?.user.findUnique({
            where: {
                publicKey: data.transactionSenderData.publicKey
            }
        })
        const receiverPromise = prisma?.user.findUnique({
            where: {
                publicKey: data.transactionReceiverData.publicKey
            }
        })

        const [sender, receiver] = await Promise.all([senderPromise, receiverPromise])
        const txns = [sender, receiver]
        console.log("Sender and receiver : ", [sender, receiver])
        console.log("TXN's : ", txns)
        for (const txn of txns) {
            if (!txn) {
                continue
            }
            const pubKey = txn.publicKey
            const senderTxn = data.transactionSenderData.publicKey === pubKey
            console.log("Data which is upserted in DB : ")
            console.log("Sender : ", senderTxn)

            const finalDescription = data.transactionType === "PAYMENT" ?
                senderTxn ?
                    `You ${data.transactionType} ${data.amount} to ${data.transactionReceiverData.publicKey}` :
                    `${data.transactionSenderData.publicKey} ${data.transactionType} ${data.amount} to you`
                :
                senderTxn ?
                    `${data.payloadDescription.replace(data.transactionSenderData.publicKey, "You")}` :
                    `${data.payloadDescription.replace(data.transactionReceiverData.publicKey, "you")}`

            console.log({
                publicKey: txn.publicKey,
                amount: data.amount,
                signature: data.signature,
                transactionData: senderTxn ? data.transactionSenderData.transactionData : data.transactionReceiverData.transactionData,
                description: finalDescription,
                type: data.transactionType || "PAYMENT",
                result: data.result
                // token : data
            })
            let finalAmount 
            if(data.transactionType === "PAYMENT" || data.transactionType === "AIRDROP"){
                finalAmount = data.amount / 1e9
            }
            else{
                finalAmount = data.amount
            }
            const dataToBeCreated = {
                publicKey: txn.publicKey,
                amount: String(finalAmount),
                signature: data.signature,
                transactionData: senderTxn ? data.transactionSenderData.transactionData : data.transactionReceiverData.transactionData,
                description: senderTxn ? `You ${data.transactionType} ${finalAmount} to ${data.transactionReceiverData.publicKey}` : `${data.transactionSenderData.publicKey} ${data.transactionType} ${data.amount} to you`,
                type: data.transactionType || "PAYMENT",
                result: data.result
            }

            await prisma.$transaction(async (tx) => {
                const exists = await tx.transaction.findUnique({
                    where: {
                        publicKey_signature: {
                            publicKey: txn.publicKey,
                            signature: data.signature
                        }
                    }
                })
                if (!exists) {
                    const dbCreateRes = await tx.transaction.create({
                        data: dataToBeCreated
                    })
                    console.log("TXN Added successfully to DB!", dbCreateRes)
                    await redisClient.lPush(queueKey, JSON.stringify({ data: dataToBeCreated }))
                    const { transactionData, ...dataToBeSent } = dataToBeCreated
                    sendClientMessage(txn.publicKey, dataToBeSent)
                }
            })

        }
        // Notify the sender or receiver if present ( queue -> (tg, email, websocket ))
        // Pushing to Queue



        res.status(200).json({
            msg: "Webhook processed successfully!"
        })
    } catch (error) {
        console.log("Error while processing : ", error)
        res.status(500).json({
            error: "Internal server error!"
        })
    }
})