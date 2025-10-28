import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
// import Login from "./pages/Login"
import Connect from "./pages/Connect"
import Transactions from "./pages/Transactions"
import Airdrops from "./pages/Airdrops"
import Escrow from "./pages/Escrow"
import Stake from "./pages/Stake"
import Payments from "./pages/Payments"
import TokenTransfer from "./pages/Tokens"
import NFT from "./pages/NFTs"
import Streaming from "./pages/Streaming"
import Notifications from "./pages/Notifications"
import { Bounce, ToastContainer } from "react-toastify"
import Notfound from "./pages/Notfound"

function App() {

  return (
    <>
      <ConnectionProvider endpoint="https://api.devnet.solana.com" >
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<Landing />} path="/" />
                {/* <Route element={<Login />} path="/login" /> */}
                <Route element={<Connect />} path="/connect" />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/airdrops" element={<Airdrops />} />
                <Route path="/escrow" element={<Escrow />} />
                <Route path="/stake" element={<Stake />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/tokens" element={<TokenTransfer />} />
                <Route path="/nfts" element={<NFT />} />
                <Route path="/streaming" element={<Streaming />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="*" element={<Notfound />} />
              </Routes>
            </BrowserRouter>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  )
}

export default App
