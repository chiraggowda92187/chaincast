import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  ArrowLeftRight,
  Plane,
  Lock,
  Coins,
  Image,
  Radio,
  Grid3x3,
  Layers,
  CircleDollarSignIcon,
  PanelRightIcon,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAuthStore } from '../store/userAuthStore';

const Sidebar: React.FC = () => {
  const [closed, setClosed] = useState(false);
  const navigate = useNavigate()
  const navItems = [
    { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
    { path: '/airdrops', label: 'Airdrops', icon: Plane },
    { path: '/escrow', label: 'Escrow', icon: Lock },
    { path: '/tokens', label: 'Tokens', icon: Coins },
    { path: '/nfts', label: 'NFTs', icon: Image },
    { path: '/stake', label: 'Stakes', icon: Layers },
    { path: '/payments', label: 'Payments', icon: CircleDollarSignIcon },
    { path: '/streaming', label: 'Streaming', icon: Radio },
    { path: '/notifications', label: 'Notification Services', icon: Grid3x3 },
  ];
  const { isAuthenticated, logout } = useAuthStore()
  const { disconnect, } = useWallet()
  const isLoggedIn = async () => {
    try {
      if (!isAuthenticated) {
        toast("Please login again!")
        disconnect()
        logout()
        navigate("/connect")
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        toast("Please login again!")
        disconnect()
        logout()
        navigate("/connect")

      }
    }
  }
  useEffect(() => {
    isLoggedIn()
  }, [])

  // useEffect(()=>{
  //   if(!connected){
  //     toast("Please login again!")
  //     navigate("/connect")
  //   }
  // }, [publicKey, connected])
  return (
    <aside className={`flex flex-col items-end h-[calc(100vh)] ${closed ? "w-[5rem" : "w-[19rem]"}  pt-[2rem] bg-black transition-all duration-300 ease-in-out`}>
      <div className={`flex w-full ${closed ? "justify-around" : "justify-between"} items-center`}>
        {!closed && <div className="">
          <button
            onClick={() => {
              navigate("/transactions")
            }}
            className="text-2xl font-bold bg-gradient-to-b from-[#E0E0E0] to-[#121212] bg-clip-text text-transparent px-[1rem] cursor-pointer">
            ChainCast{' '}
            <span className="bg-gradient-to-tr from-greenStart to-greenEnd text-btncolor text-xs px-1 font-md rounded-sm tracking-[-0.03em]">
              Devnet
            </span>
          </button>
        </div>}
        <div className={` ${closed ? "" : `mr-2 mb-1`}`}>
          <PanelRightIcon
            strokeWidth={2}
            size={18}
            onClick={() => {
              setClosed(!closed);
            }}
            className="text-secondGray font-light text-sm "
          />
        </div>
      </div>
      <div className="h-[1px] w-[90%] bg-secondary my-[1rem]"></div>
      <nav className={`w-full px-[1rem] `}>
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="group w-full  "
            >
              {({ isActive }) => (
                <div
                  className={`group w-full text-thirdgray font-md flex ${closed ? "justify-around" : ""} items-center ${!closed && "gap-3"} my-[1.2rem] rounded-lg transition-all text-sm tracking-[-0.03em]  duration-200 `}
                >
                  <Icon
                    className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'
                      }`}
                  />

                  <span
                    className={` ${closed ? "w-0 opacity-0 pl-0" : "max-w-max opacity-100 group-hover:pl-1"} transition-all ease-in-out duration-150`}
                  >
                    {item.label}
                  </span>

                </div>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
