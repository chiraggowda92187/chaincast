import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import prisma from "../utils/prisma";

export const authorizeRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.cookies["AUTH_TOKEN"]
        console.log(authToken)
        if (!authToken) {
            return res.status(401).json({
                error: "Not authorized!"
            })
        }
        const tokenVerified = jwt.verify(authToken, process.env.JWT_SECRET || "") as JwtPayload
        const publicKey = tokenVerified.publicKey
        const userExists = prisma?.user.findFirst({
            where: {
                publicKey
            }
        })
        if (!userExists) {
            return res.status(401).json({
                error: "Not authorized!"
            })
        }
        req.user = {
            publicKey
        }
        next()
    } catch (error) {
        console.log(error)
        res.cookie("AUTH_TOKEN", null, {
            httpOnly: true,           // prevents JS access
            secure: process.env.NODE_ENV === "production", // true on https
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // needed for cross-site cookies
            maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
        })
        return res.status(401).json({
            error: "Unauthorized!"
        })
    }
}