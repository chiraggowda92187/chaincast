
import { createClient, RedisClientType } from "redis";
import { actions } from "./actions";
import prisma from "../utils/prisma";
import express from "express"


export let redisClient: RedisClientType;


const redisUrl = process.env.REDIS_URL || ""

export async function connectRedisclient() {
    redisClient = createClient({
        // options
        url : redisUrl
    })
    redisClient.on("error", (err : any) => {
        console.log("Error in redis client : ", err)
    })
    redisClient.on("connect", async ()=>{
        console.log("Connected to redis Server!")
    })
    await redisClient.connect()
    await startWorker()
}
    


const queueKey = process.env.QUEUE_KEY || ""

export async function startWorker() {
    console.log("Worker Started to listen for Queue Data...!")
    const app = express()
    while (1) {
        try {
            const qData = await redisClient.brPop(queueKey, 0)
            if (!qData) {
                continue
            }
            const mainData = JSON.parse(qData.element)
            const pubKey = mainData.publicKey
            const userNotifications = await prisma?.notification.findMany({
                where: {
                    publicKey: pubKey
                }
            })
            if (!userNotifications) {
                continue
            }
            console.log("Got a response : ", mainData, qData, userNotifications)
            for (const notification of userNotifications) {
                const action = actions[notification.type]
                console.log("Action : ", action)
                await action(notification.notificationId, mainData.data)
            }
        } catch (error) {
            console.log("Error in the worker : ", error)
        }
    }
}

connectRedisclient()