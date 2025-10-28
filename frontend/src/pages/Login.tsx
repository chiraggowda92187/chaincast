import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/userAuthStore"
import { useDataFetcher } from "../utils/useDataFetcher"
import "../App.css"

const backendUrl = "http://localhost:3000"

export default function Login() {

  
  console.log("Here")
  

  const { disconnect, signMessage, connected, publicKey } = useWallet()

  const { isAuthenticated, login, logout } = useAuthStore()
  const handleSignMessage = async () => {
    try {
      if (!connected || !signMessage) {
        console.log("Wallet not connected")
        // Throw error
        // Redirect to connect page
        return
      }
      // Fetch nonce from be
      const res = await axios.get(`http://localhost:3000/api/auth/nonce?pk=${publicKey}`)
      const nonce = res.data.nonce

      const originalMessage = `Sign this message to verify your wallet Identity \n ${nonce}`
      const encodedMsgBytes = new TextEncoder().encode(originalMessage)
      const signedRes = await signMessage(encodedMsgBytes)

      // Verifying the signature
      const beRes = await axios.post("http://localhost:3000/api/auth/verify", {
        publicKey: publicKey,
        signature: Array.from(signedRes),
        nonce
      }, {
        withCredentials: true
      })
      login({
        publicKey: beRes.data.publicKey
      })
    } catch (error) {
      // handle the error
      // hanndle not logged in
      logout()
      console.log(error)
    }

  }

  const [email, setEmail] = useState("")
  const [otpDisplay, setOtpDisplay] = useState(false)
  const [otp, setOtp] = useState(0)

  const handleVerify = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/notification/email`, {
        email
      }, {
        withCredentials: true
      })
      console.log(res)
      setOtpDisplay(true)
    } catch (error) {
      console.log(error)
    }
  }
  const handleOtpVerify = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/notification/email/verify`, {
        email,
        otp
      }, {
        withCredentials: true
      })
      console.log(res)

    } catch (error) {
      console.log(error)
    }
  }

  const [telegramVerify, setTelegramVerify] = useState<{ uuid: string } | null>(null)
  const telegramOtpVerify = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/notification/telegram`, {
        publicKey
      },{
        withCredentials : true
      })
      setTelegramVerify({
        uuid: res.data.uuid
      })
    } catch (error) {
      // Handle logout
      console.log(error)
    }
  }
  const {getDataByType} = useDataFetcher()

  useEffect(()=>{
    console.log("Pub key", publicKey, connected)
    if(!publicKey){
      return
    }
    const ws = new WebSocket(`ws://localhost:8080/${publicKey.toString()}`)
    ws.onmessage = (ev)=>{
      console.log("MEssage from wss : ", JSON.parse(ev.data))
    }
  }, [publicKey, connected])


  return (
    <>

      <div>
        {/* <div className="bg-red-100 border-[1px]" >
                    <button onClick={()=>{
                    connected ? setVisible(true) : disconnect()
                }}>{connected ? "Diconnect" : "Connect"}</button>
                </div> */}
        {/* <WalletMultiButton/> */}
        <CustomWalletButton />
        <button onClick={() => {
          disconnect()
        }}>
          Disconnect
        </button>

        {connected ?
          <button onClick={handleSignMessage}>
            Sign message
          </button> : <></>}
        {
          connected ? <div>
            <input
              value={email}
              placeholder="Email"
              type="email" name="" id=""
              onChange={(e) => {
                const value = e.target.value
                setEmail(value)
              }} />
            <button onClick={handleVerify}>Verify</button>
          </div> : <></>
        }
        {
          connected && otpDisplay && <div>
            <input
              value={otp}
              placeholder="OTP"
              type="number" name="" id=""
              onChange={(e) => {

                setOtp(e.target.value as unknown as number)
              }} />
            <button onClick={handleOtpVerify}>Verify</button>
          </div>
        }
        {
          isAuthenticated &&
          <button onClick={() => {
            getDataByType()
          }}>Get Data</button>
        }

        {
          (isAuthenticated && connected) &&
          (<div>
            <button onClick={telegramOtpVerify}>Telegram Notify</button>
            {
              telegramVerify !== null && <div>
                <h1>Click on the below url</h1>
                <a href="https://t.me/AgentCastBot" target="_blank" rel="noopener noreferrer" >Open Telegram</a>
                <h1>Copy this message and send it</h1>
                <h1>/verify {telegramVerify?.uuid}</h1>
              </div>
            }
          </div>
          )
        }
        

      </div>
    </>
  )
}


export const CustomWalletButton = () => {

  const walletModal = useWalletModal()
  const { connected, publicKey } = useWallet()
  const navigate = useNavigate()
  return (
    <button
      onClick={() => {

        if (!connected) {
          walletModal.setVisible(true)
        }
        else {
          navigate("/dashboard")
        }
      }}
      className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-600 transition duration-300"
    >
      {connected ? `${publicKey}` : "Connect your wallet"}
      
    </button>
  );
};
