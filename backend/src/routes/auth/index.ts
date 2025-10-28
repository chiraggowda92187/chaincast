import { Router } from "express"
import nacl from "tweetnacl"
import { PublicKey } from "@solana/web3.js"
import crypto from "crypto"
import { getNonce, redisClient, setNonce } from "../../utils/redis"
import jwt from "jsonwebtoken"
import "dotenv/config"
import prisma from "../../utils/prisma"
import { appendAddressToWebHook } from "../../helius"
import { authorizeRequest } from "../../middleware"




export const authRouter = Router()

authRouter.get("/health", (req, res) => {
    res.json({
        msg: "healthy"
    })
})

authRouter.get("/nonce", async (req, res) => {
    try {
        const publicKey = req.query.pk as string
        if (!publicKey) {
            return res.status(400).json({
                error: "Wrong Params!"
            })
        }

        const nonce = crypto.randomBytes(16).toString("hex")
        await setNonce(publicKey, nonce)

        res.json({
            nonce
        })
    } catch (error) {
        console.log("Error : ", error)
        res.status(500).json({
            error: "Internal Server error!"
        })
    }
})

authRouter.post("/verify", async (req, res) => {
    try {
        const { signature, publicKey, nonce } = req.body
        const message = new TextEncoder().encode(`Sign this message to verify your wallet Identity \n ${nonce}`)

        const genNonce = await getNonce(publicKey)
        if (!genNonce) {
            return res.status(400).json({
                error: "Login expired!"
            })
        }
        const verified = nacl.sign.detached.verify(
            message, new Uint8Array(signature), new PublicKey(publicKey).toBytes())
        // Upserting to DB the user with public key
        // Set cookie
        if (verified) {
            const userExists = await prisma.user.findFirst({
                where: {
                    publicKey
                }
            })

            if (!userExists) {
                const newUser = await prisma.user.create({
                    data: {
                        publicKey,
                        lastLoggedIn: new Date()
                    }
                })
                await appendAddressToWebHook(publicKey)
                console.log("Added user to db and appended to webhook!")
            }
            else {
                const updateRes = await prisma.user.update({
                    where: {
                        publicKey
                    },
                    data: {
                        lastLoggedIn: new Date()
                    }
                })
                console.log("Updated user in db!")
            }
            // send cookies
            const secret = process.env.JWT_SECRET || ""
            const token = jwt.sign({ publicKey }, secret, {
                expiresIn: "5d"
            })
            res.cookie("AUTH_TOKEN", token, {
                httpOnly: true,           // prevents JS access
                secure: process.env.NODE_ENV === "production", // true on https
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // needed for cross-site cookies
                maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
            })
            return res.json({
                publicKey,
                msg: "Verified successfully!"
            })
        }
        else {
            return res.status(400).json({
                error: "Verification Failed!"
            })
        }
    } catch (error) {
        console.log("Error : ", error)
        res.json({
            error: "Some error occured please try again!"
        })
    }
})

authRouter.post("/logout", async (req, res) => {
    res.cookie("AUTH_TOKEN", null, {
        httpOnly: true,           // prevents JS access
        secure: process.env.NODE_ENV === "production", // true on https
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // needed for cross-site cookies
        maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
    })
    res.status(200).json({
        msg: "Logged out successfully!"
    })

})


authRouter.get("/isloggedin", authorizeRequest, (req, res) => {
    res.status(200).json({
        msg: "User is logged in!"
    })
})