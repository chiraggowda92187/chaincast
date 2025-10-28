import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getColor } from '../utils/getColor';
import { ExpandableText } from './Transactions';
import { Success } from '../components/Success';
import { Failure } from '../components/Failure';
import TopBar from '../components/TopBar';
import useWebSocket from '../utils/useWebSocket';


const Streaming: React.FC = () => {
    const { transactions, connect, disConnect } = useWebSocket()

    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index: any) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };
    const [isConnected, setIsConnected] = useState(false);
    const handleConnectDisconnect = () => {
        if (!isConnected) {
            connect()
            setIsConnected(true)
        }
        else {
            disConnect()
            setIsConnected(false)
        }

    }



    return (
        <div className="min-h-screen bg-black relative w-[100vw] leading-[-0.03em] overflow-hidden max-w-[100vw]">
            {/* <TopNav /> */}
            <div className="flex w-[99%] overflow-hidden max-w-[100vw]">
                <Sidebar />
                <div className="pl-[1rem] pt-[1rem] rounded-lg m-2 bg-charcoal w-[100%]  max-h-full  border-[2px] border-secondary/25 overflow-y-auto overflow-x-hidden">
                    <div className="space-y-6 max-w-[100%]">
                        <TopBar
                            title={"Stream"}
                            description={" View live all your transactions in one place. Click on stream to get started!"}
                            refreshButtonHandle={() => { }}
                            noRefreshBtn={true}
                        />


                        {/* Content */}
                        <div className="w-[95%]">
                            <div className="w-[50%] bg-secondbackground flex flex-col justify-center items-center py-[0.3rem] rounded-2xl">
                                <div className="w-full">
                                    <h1 className="text-mainwhite text-sm ml-3 py-1">
                                        Streaming Control Board
                                    </h1>
                                </div>
                                <div className="bg-innerbackground flex justify-between py-3 w-[98.5%] h-[98%] rounded-xl">
                                    <div className="flex items-center ml-3 ">
                                        <div className=" ">
                                            {/* Icon */}
                                            <div className="bg-gradient-to-tr from-greenStart to-greenEnd rounded-md"></div>
                                        </div>
                                        <div className="text-mainwhite ml-3">
                                            <button
                                                onClick={handleConnectDisconnect}

                                                className="bg-backgroundgray rounded-sm px-3 py-2 border-[1px] border-secondary text-xs font-light cursor-pointer">
                                                {isConnected ? "Stop Stream" : "Start Stream"}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center pr-[1rem] ">
                                        <h1 className="relative flex items-center gap-3 pr-4">
                                            {isConnected ?
                                                <>
                                                    <span className="relative  flex size-3">
                                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-to-tr from-greenStart to-greenEnd opacity-75"></span>
                                                        <span className="relative inline-flex size-3 rounded-full bg-gradient-to-tr from-greenStart to-greenEnd"></span>
                                                    </span>
                                                    <span className="text-mainwhite">Live</span>
                                                </> :

                                                <>
                                                    <span className="relative  flex size-3">
                                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-700 opacity-75"></span>
                                                        <span className="relative inline-flex size-3 rounded-full bg-yellow-700"></span>
                                                    </span>
                                                    <span className="text-mainwhite">Not Live</span>
                                                </>
                                            }
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[95%]">
                            <div className=" text-thirdgray text-xs grid grid-cols-5 bg-secondbackground py-2 rounded-md">
                                <div className="bg-re-100 ml-3">
                                    <h1>Type</h1>
                                </div>
                                <div className="bg-re-200 ml-3">
                                    <h1>Signature</h1>
                                </div>
                                <div className="bg-re-300 ml-3">
                                    <h1>Description</h1>
                                </div>
                                <div className="bg-re-400 ml-3">
                                    <h1>Amount</h1>
                                </div>
                                <div className="bg-re-500 ml-3">
                                    <h1>Result</h1>
                                </div>
                            </div>

                            <div className="w-[98%] ">
                                {(transactions === null || transactions?.length === 0) ?
                                    <>
                                        <div className='w-full flex justify-center mt-4'>
                                            <p className='text-xs text-thirdgray font-light'>No transactions yet!</p>
                                        </div>

                                    </> :
                                    transactions.length > 0 ?
                                        transactions.map((transaction, i) => {
                                            const color = getColor(transaction.type);
                                            return (
                                                <>
                                                    <div
                                                        className="grid grid-cols-5 border-b-[1px] border-secondary text-mainwhite text-xs cursor-pointer"
                                                        onClick={() => {
                                                            toggleExpand(i);
                                                        }}
                                                    >
                                                        <div className={`ml-3 my-4 rounded-md`}>
                                                            <div>
                                                                <h1
                                                                    style={{
                                                                        backgroundColor: `${color}`,
                                                                    }}
                                                                    className="truncate max-w-max px-2 py-1 rounded-sm font-md"
                                                                >
                                                                    {transaction.type.replace('_', ' ')}
                                                                </h1>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="ml-3 my-4 font-extralight group"
                                                            onMouseEnter={() => { }}
                                                        >
                                                            <a
                                                                href={`https://explorer.solana.com/tx/${transaction.signature}?cluster=devnet`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <ExpandableText
                                                                    isExpanded={expandedIndex === i}
                                                                    text={transaction.signature}
                                                                    width={'100%'}
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="ml-3 my-4">
                                                            <ExpandableText
                                                                isExpanded={expandedIndex === i}
                                                                text={transaction.description}
                                                                width={'100%'}
                                                            />
                                                        </div>
                                                        <div className="ml-3 my-4">
                                                            <h1 className="truncate">{transaction.amount}</h1>
                                                        </div>
                                                        <div className="ml-3 my-4">
                                                            <h1 className="truncate">
                                                                {transaction.result ? <Success /> : <Failure />}
                                                            </h1>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        }) :
                                        <div className="w-full flex justify-center items-center mt-8">
                                            <h1 className="text-thirdgray/40 text-xs ">Start streaming to get Started </h1>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Streaming;



