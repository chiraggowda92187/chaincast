import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import Loader from "../components/Loader"
import { useAuthStore } from "../store/userAuthStore"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { backendUrl } from "../utils/misc"
import "../App.css"


export default function Connect() {

    const wallet = useWallet()
    const walletModal = useWalletModal()
    const [isLoading, setIsLoading] = useState(false)
    const { isAuthenticated, login, logout } = useAuthStore()
    const navigate = useNavigate()

    const handleLogin = useCallback(async () => {
        try {
            setIsLoading(true)
            if (!wallet.connected) {
                // console.log("HEre")
                walletModal.setVisible(true)
            }
            setIsLoading(false)
        }
        catch (err: any) {

        }
    }, [walletModal, wallet])

    const handleSignMessage = async () => {
        try {
            if (!wallet.connected || !wallet.signMessage) {
                console.log("Wallet not connected")
                // await wallet.disconnect()
                // Redirect to connect page
                return
            }
            setIsLoading(true)
            // Fetch nonce from be
            const res = await axios.get(`${backendUrl}/api/auth/nonce?pk=${wallet.publicKey}`)
            const nonce = res.data.nonce

            const originalMessage = `Sign this message to verify your wallet Identity \n ${nonce}`
            const encodedMsgBytes = new TextEncoder().encode(originalMessage)
            const signedRes = await wallet.signMessage(encodedMsgBytes)

            // Verifying the signature
            const beRes = await axios.post(`${backendUrl}/api/auth/verify`, {
                publicKey: wallet.publicKey,
                signature: Array.from(signedRes),
                nonce
            }, {
                withCredentials: true
            })
            login({
                publicKey: beRes.data.publicKey
            })
            setIsLoading(false)
            navigate("/transactions")
            toast("Logged In Successfully!")
        } catch (error) {
            logout()
            await wallet.disconnect()
            setIsLoading(false)
            toast("There was a error while logging in!")
            console.log(error)
        }
    }
    useEffect(() => {
        if (!isAuthenticated && wallet.connected) {
            handleSignMessage()
        }
    }, [wallet.connected])

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/transactions")
        }
    }, [])
    return (
        <>
            <div className="relative w-screen h-screen bg-[url(/img/bg/login.jpg)] bg-cover bg-center bg-no-repeat overflow-hidden">
                <div className="absolute z-0 bg-b w-full h-full "></div>
                <div className="absolute z-10 flex flex-col justify-center items-center w-full h-full">
                    <div className="w-[72rem] h-[35rem] bg-blue- flex items-center rounded-xl border-[1px] border-gray-700 bg-black/10">
                        <div className="w-[63%] h-[100%] bg-black/90 text-white flex flex-col justify-center items-center rounded-xl border-[1px] border-gray-700 bg-">
                            <div className="w-[63%]">
                                <h1 className="text-2xl font-semibold mb-2 text-white">Login using your wallet</h1>
                                <p className="text-sm font-light ">Join ChainCast by connecting your wallet and signing a message
                                    <br />
                                    Really its that simple!
                                </p>
                                <div className="mt-8">
                                    <button
                                        disabled={isLoading}
                                        className="bg-linear-to-b from-greenEnd to-greenStart px-4 w-full text-black rounded-md font-md py-2 mt-4 cursor-pointer" onClick={handleLogin}>{isLoading ? <Loader /> : "Connect"}</button>
                                    <div className="text-sm text-[#9B9CAB] font-extralight mt-8 flex gap-2">
                                        <div>Powered by </div>
                                        <div className="flex gap-2"><img src="/img/icons/solana.png" width={20} alt="" />

                                            <span>SOLANA</span></div>
                                    </div>
                                    <p className="text-sm text-[#9B9CAB] font-extralight mt-8"> Please note: <br />
                                        Connection might take a little longer due to high traffic. It may take up to 1–2 minutes to connect. <br />

                                    </p>
                                    <p className="text-sm text-[#9B9CAB] font-extralight mt-8">By logging in you agree to chaincast's <span className="underline">Privacy Policy</span> and <span className="underline">Terms of Service</span></p>
                                </div>

                            </div>
                        </div>
                        <div className="w-[37%] h-full flex flex-col justify-between items-center">
                            <div className="w-[75%] mt-8">
                                <h1 className="text-white text-2xl">ChainCast</h1>
                                <p className="text-white text-2xl mt-4 leading-[1em] tracking-[-0.03em]">Experience ChainCast your all-in-one hub for effortless payment tracking, NFT monitoring, and smart escrow management</p>
                            </div>
                            <div className=" w-[75%] text-white text-xs font-extralight flex flex-col justify-center mb-8">
                                <p>Experiencing issues?</p>
                                <p>Get assistance via <span className="underline">biotitewarlock@gmail.com</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}