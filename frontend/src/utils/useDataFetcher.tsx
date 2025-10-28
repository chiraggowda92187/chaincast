import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "./misc";
import { useAuthStore } from "../store/userAuthStore";


export function useDataFetcher() {
    const { disconnect } = useWallet()
    const {logout} = useAuthStore()
    const navigate = useNavigate()


    async function getDataByType(type?: string) {
        try {
            const res = await axios.get(`${backendUrl}/api/data/transactions${type ? `?type=${type}` : ``}`, {
                withCredentials: true
            })
            return {
                transactions: res.data.transactions
            }
        } catch (error: any) {
            console.log(error)
            if (error.response.status === 401) {
                // if not authorized log out and disconnect wallet
                logout()
                await disconnect()
                navigate("/connect")
            }
        }
    }

    return { getDataByType }
}