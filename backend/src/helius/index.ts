import "dotenv/config"
import { Helius } from "helius-sdk"



const heliusaApiKey = process.env.HELIUS_API_KEY || ""
export const heliusClient = new Helius(heliusaApiKey)




export async function appendAddressToWebHook(publicKey: string) {
    try {
        
        // const existingWebhook = await heliusClient.webhooks.get(process.env.HELIUS_WEBHOOK_ID || "")
        // const accountAddresses = existingWebhook.accountAddresses
        // accountAddresses.push(publicKey)
        // const updateRes = await heliusClient.webhooks.update(process.env.HELIUS_WEBHOOK_ID || "", {
        //     accountAddresses : accountAddresses
        // })
        // const newUpdatedRes = await heliusClient.webhooks.getAll()
        // console.log("Appended the public key to the webhook!", newUpdatedRes)
        const newUpdatedRes = await heliusClient.appendAddressesToWebhook(process.env.HELIUS_WEBHOOK_ID as string, [publicKey])
        console.log("Appended the public key to the webhook!", newUpdatedRes)
    } catch (error) {
        console.log("Error while updating the webhook : ", error)
    }
    // console.log("Webhooks : ", res)
}

async function getWebhook(){
    try {
        
         const newUpdatedRes = await heliusClient.getAllWebhooks()
        console.log("Appended the public key to the webhook!", newUpdatedRes)
    } catch (error) {
        console.log("Error while updating the webhook : ", error)
    }
}

