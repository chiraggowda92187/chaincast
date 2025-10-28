import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function isDev() {
    const isDevelopment = window.location.hostname === 'localhost' ||
        window.location.hostname.startsWith('192.168.') ||
        window.location.hostname.startsWith('10.') ||
        window.location.hostname.includes('dev') ||
        window.location.hostname.includes('staging');
    return isDevelopment
}


export const wsUrl = isDev() ? import.meta.env.VITE_DEV_WS_URL : import.meta.env.VITE_PROD_WS_URL

export default function useWebSocket() {
    const navigate = useNavigate()
    const [websocket, setWebSocket] = useState<WebSocket | null>(null)
    const [transactions, setTransactions] = useState<any[]>([])

    const { publicKey, connected } = useWallet()
    const connect = () => {
        console.log("Here")
        if (!connected || !publicKey) {
            toast("Please login again!")
            navigate("/connect")
            return
        }
        const ws = new WebSocket(`${wsUrl}/${publicKey.toString()}`)
        setWebSocket(ws)
        ws?.addEventListener("open", () => {
            console.log("Connected successfully!")
        })
        ws?.addEventListener("message", (ev) => {
            const wssData = JSON.parse(ev.data)
            console.log("Message from ws : ", wssData)
            setTransactions((txns)=>([...txns, wssData]))
        })

    }
    const disConnect = () => {
        websocket?.close()
        setWebSocket(null)
    }
    useEffect(()=>{
        return ()=>{
            disConnect()
        }
    }, [])
    return {
        websocket,
        disConnect,
        connect,
        transactions
    }

}
