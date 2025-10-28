import RedisClient from "@redis/client/dist/lib/client";
import { createClient, RedisClientType } from "redis";
import {randomInt} from "crypto"



export let redisClient: RedisClientType;

const redisUrl = process.env.REDIS_URL || ""

export async function connectRedisclient() {
    redisClient = createClient({
        // options
        url : redisUrl
    })
    redisClient.on("error", (err) => {
        console.log("Error in redis client : ", err)
    })
    redisClient.on("connect", ()=>{
        console.log("Connected to redis Server!")
    })

    
    await redisClient.connect()
}



export async function setNonce(publicKey : string, nonce : string){
    try {
        await redisClient.set(
            `nonce:${publicKey}`,
            nonce,
            {
                expiration: {
                    type: "EX",
                    value: 300000
                }
            }
        )
    } catch (error) {
        throw new Error("Error in setting nonce in redis!")
    }
}


export async function getNonce(publicKey : string){
    try {
        const nonce = await redisClient.get(`nonce:${publicKey}`)
        return nonce
    } catch (error) {
        return null
    }
}


export async function setOtp( email : string){
     try {
        const otp = randomInt(1000, 10000)
        await redisClient.set(`${email}`, otp, {
            expiration : {
                type : "EX",
                value : 300000
            }
        })
        return otp
    } catch (error) {
        return null
    }

}

export async function getOtp(email : string){
     try {
        const otp = await redisClient.get(`${email}`)
        return otp
    } catch (error) {
        return null
    }

}
 


export async function setUuid(publicKey : string){
    try {
        const uuid = crypto.randomUUID()
        await redisClient.set(`${uuid}`, publicKey, {
            expiration : {
                type : "EX",
                value : 300000
            }
        })
        return uuid
    } catch (error) {
        return null
    }
}

export async function getPublicKey(uuid : string){
     try {
        const publicKey = await redisClient.get(`${uuid}`)
        return publicKey
    } catch (error) {
        return null
    }

}

export async function deletePublicKey(uuid : string) {
    try {
        const publicKey = await redisClient.del(`${uuid}`)
        return publicKey
    } catch (error) {
        return null
    }
}