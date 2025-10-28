import React, { useEffect, useState } from 'react';
import {
    EclipseIcon
} from 'lucide-react';

import Sidebar from '../components/Sidebar';
import { getColor } from '../utils/getColor';
import { Success } from '../components/Success';
import { Failure } from '../components/Failure';
import TopBar from '../components/TopBar';
import { useDataFetcher } from '../utils/useDataFetcher';
import { toast } from 'react-toastify';

const Transactions: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const toggleExpand = (index: any) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };
    const [isLoading, setIsLoading] = useState(false)
    const [transactions, setTransactions] = useState<any[] | null>(null);
    const { getDataByType } = useDataFetcher()
    const fetchTransactions = async () => {
        try {
            setIsLoading(true)
            const data = await getDataByType()
            setTransactions(data?.transactions)
            setIsLoading(false)
            
        } catch (error) {
            toast("There was an error while fetching data!")
        }
    }

    const refreshButtonHandle = async () => {
        await fetchTransactions()
    }

    useEffect(() => {
        fetchTransactions()
    }, [])



    return (
        <div className="min-h-screen bg-black relative w-[100vw] leading-[-0.03em] overflow-hidden max-w-[100vw]">
            {/* <TopNav /> */}
            <div className="flex w-[99%] overflow-hidden max-w-[100vw]">
                <Sidebar />
                <div className="pl-[1rem] pt-[1rem] rounded-lg m-2 bg-charcoal w-[100%]  max-h-full  border-[2px] border-secondary/25 overflow-y-auto overflow-x-hidden">
                    <div className="space-y-6 max-w-[100%]">
                        <TopBar
                            title={"Transactions"}
                            description={"Track all your transactions with real-time on-chain monitoring, detailed analytics, and instant activity notifications."}
                            refreshButtonHandle={refreshButtonHandle}
                        />


                        {/* Content */}
                        <div className="w-[95%]">
                            <div className="w-[50%] bg-secondbackground flex flex-col justify-center items-center py-[0.3rem] rounded-2xl">
                                <div className="w-full">
                                    <h1 className="text-mainwhite text-sm ml-3 py-1">Overview</h1>
                                </div>
                                <div className="bg-innerbackground flex justify-between py-3 w-[98.5%] h-[98%] rounded-xl">
                                    <div className="flex items-center ml-3 ">
                                        <div className=" ">
                                            {/* Icon */}
                                            <div className="bg-gradient-to-tr from-greenStart to-greenEnd rounded-md">
                                                <EclipseIcon
                                                    size={36}
                                                    strokeWidth={1}
                                                    className="text-black"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-mainwhite ml-3">
                                            <h1 className="text-2xl">{transactions?.length ? transactions.length : 0}</h1>
                                            <p className="text-thirdgray text-xs ">
                                                Token Transfers
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pr-[1rem] ">
                                        <h1 className="text-sm text-mainwhite">Note : </h1>
                                        <p className="text-xs text-thirdgray">
                                            Please click on the signature to know more
                                        </p>
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
                                {(transactions === null || transactions?.length === 0 || isLoading) ? isLoading ?
                                    <>
                                        <div className='w-full flex justify-center mt-4'>
                                            <p className='text-xs text-thirdgray font-light'>Loading!</p>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='w-full flex justify-center mt-4'>
                                            <p className='text-xs text-thirdgray font-light'>No transactions yet!</p>
                                        </div>

                                    </> : transactions.map((transaction, i) => {
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
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transactions;



export function ExpandableText({
    text,
    isExpanded,
    width,
}: {
    text: string;
    isExpanded: boolean;
    isHovered?: boolean;
    width: string;
}) {
    return (
        <div
            className={`relative w-[${width}] transition-all duration-300 ease-in-out group-hover:font-md ${isExpanded ? 'whitespace-normal break-words' : 'truncate'
                }`}
        >
            <p
                className={`transition-all duration-300 ${isExpanded ? 'max-h-40' : 'max-h-5'
                    } overflow-hidden`}
            >
                {text}
            </p>

            {/* Gradient overlay when truncated */}
            {!isExpanded && (
                <div
                    className={`absolute right-0 top-0 h-full w-[${width}]  px-3 mx-1`}
                ></div>
            )}
        </div>
    );
}
