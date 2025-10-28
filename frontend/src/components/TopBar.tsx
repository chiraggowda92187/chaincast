import { useWallet } from "@solana/wallet-adapter-react";
import { RefreshCwIcon, UnplugIcon } from "lucide-react"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useLogout from "../utils/useLogout";


export default function TopBar({ title, description, refreshButtonHandle, noRefreshBtn }: {
    title: string,
    description: string,
    refreshButtonHandle: React.MouseEventHandler<HTMLButtonElement>,
    noRefreshBtn?: boolean
}) {
    const { publicKey, } = useWallet()
    const [displayPublicKey, setPublicKey] = useState("");
    const {logout} = useLogout()

    const handleHover: React.MouseEventHandler<HTMLHeadingElement> = (e) => {
        const type = e.type;
        if (!publicKey) {
            handleDisconnect()
            return
        }
        if (type === 'mouseleave') {
            console.log('Here');
            setPublicKey(`${publicKey?.toString().slice(0, 3)}...`);
        } else if (type === 'mouseenter') {
            setPublicKey(publicKey.toString());
        }
    };
    const handleDisconnect = async ()=>{
        await logout()
        toast("Disconnected successfully!")

    }
    useEffect(() => {
        setPublicKey(`${publicKey?.toString().slice(0, 3)}...`)
    }, [publicKey])


    return (
        <>
            <div className="flex justify-between ">
                <div>
                    <h1 className="text-2xl font-semibold text-mainwhite tracking-[-0.02em]">
                        {title}
                    </h1>
                    <p className="text-[#A0A0A0] mt-1 text-xs font-md tracking-[-0.03em] leading-[-0.03em]">
                        {description}
                    </p>
                    {/* <div className="w-[100vh] mt-6 h-[0.3px] bg-secondary"></div> */}
                </div>

                <div className="flex gap-[0.75rem]">
                    {!noRefreshBtn && <div>
                        <button className="text-mainwhite p-2 rounded-full bg-backgroundgray cursor-pointer" onClick={refreshButtonHandle}>
                            <RefreshCwIcon strokeWidth={3} size={15} className=" " />
                        </button>
                    </div>}
                    <div className=""  onClick={handleDisconnect}>
                        <button className="text-mainwhite p-2 rounded-full bg-backgroundgray cursor-pointer">
                            <UnplugIcon strokeWidth={3} size={15} className=" " />
                        </button>
                    </div>
                    <div className="h-[50%] w-[1px] bg-secondary"></div>
                    <div>
                        <h1
                            onMouseEnter={handleHover}
                            onMouseLeave={handleHover}
                            className="text-black text-sm bg-mainwhite px-2 py-1 rounded-full"
                        >
                            {displayPublicKey}
                        </h1>
                    </div>
                </div>
            </div>
        </>
    )
}