import { IncomingMessage, Server, ServerResponse } from "http"
import WebSocket, { WebSocketServer } from "ws"
import prisma from "../utils/prisma"

const clients = new Map<string, WebSocket>

export const startWss = (httpExpressServer : Server<typeof IncomingMessage, typeof ServerResponse>) => {
   try {
     const wss = new WebSocketServer({
        server : httpExpressServer
    })
    wss.on("connection", async (ws, req) => {
        // ws.send("Connected Successfully!")
        // console.log(req,ws)
        const pubKey = req.url?.replace("/", "")
        console.log("Someone connected with this url and pub key", req.url, pubKey)
        if (!pubKey) {
            ws.close()
            return
        }
        const userExists = await prisma?.user.findFirst({
            where: {
                publicKey: pubKey
            }
        })
        if (!userExists) {
            return
        }
        console.log("Client connected pubkey : ", pubKey)
        clients.set(pubKey, ws)
        ws.onopen = (ev) => {
            ws.send("Hello!")
        }
        ws.onclose = (ev) => {
            clients.delete(pubKey)
        }
    })
    console.log("Started ws server!")
   } catch (error) {
    console.log("Error in wss : ", error)
   }
}


export function sendClientMessage(pubKey: string, data: any) {
    const ws = clients.get(pubKey)
    if(!ws || ws.readyState !== WebSocket.OPEN){
        console.log("Client with pubkey : ", pubKey, " Not connected")
        return
    }
    console.log("Message Sent successfully to : ",pubKey, " Data : ", data)
    ws.send(JSON.stringify(data))
}