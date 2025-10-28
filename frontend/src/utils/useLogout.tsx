import { useWallet } from "@solana/wallet-adapter-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { backendUrl } from "./misc"


export default function useLogout() {
    const { disconnect } = useWallet()
    const navigate = useNavigate()
    async function logout() {
        await disconnect()
        await beLogout()
        toast("Logged out!")
        navigate("/connect")
    }
    return {
        logout
    }
}


const beLogout = async () => {
    try {
        await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true })
    } catch (error) {
        toast("There was an error while logging out!")
        console.log("")
    }
}