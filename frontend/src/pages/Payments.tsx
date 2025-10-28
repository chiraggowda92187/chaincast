import React, { useEffect, useState } from 'react';
import {
    EclipseIcon,
} from 'lucide-react';

import Sidebar from '../components/Sidebar';
import { getColor } from '../utils/getColor';
import { ExpandableText } from './Transactions';
import { Success } from '../components/Success';
import { Failure } from '../components/Failure';
import TopBar from '../components/TopBar';
import { useDataFetcher } from '../utils/useDataFetcher';
import { toast } from 'react-toastify';

const Payments: React.FC = () => {
    

    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index: any) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };
    const [payments, setPayments] = useState<null | any[]>(null);

    const [isLoading, setIsLoading] = useState(false)
    const { getDataByType } = useDataFetcher()
    const fetchPayments = async () => {
        try {
            setIsLoading(true)
        const data = await getDataByType("PAYMENT")
        setPayments(data?.transactions)
        setIsLoading(false)
        
        } catch (error) {
            toast("There was an error while fetching data!")
        }
    }

    const refreshButtonHandle = async () => {
        await fetchPayments()
    }

    useEffect(() => {

        fetchPayments()
    }, [])

    return (
        <div className="min-h-screen bg-black relative w-[100vw] leading-[-0.03em] overflow-hidden">
            {/* <TopNav /> */}
            <div className="flex w-[100%]">
                <Sidebar />
                <div className="pl-[1rem] pt-[1rem] rounded-lg m-2 bg-charcoal w-[100%]  border-[2px] border-secondary/25 ">
                    <div className="space-y-6 max-w-[100%]">
                        <TopBar
                            title={"Payments"}
                            description={"Monitor your payments in real time with on-chain analytics, transaction insights, and instant status notifications."}
                            refreshButtonHandle={refreshButtonHandle}
                        />


                        {/* Content */}
                        <div className="w-[100%]">
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
                                            <h1 className="text-2xl">{payments?.length ? payments.length : 0}</h1>
                                            <p className="text-thirdgray text-xs ">
                                                Payments
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
                        <div className="w-[98%]">
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
                                {(payments === null || payments?.length === 0 || isLoading) ? isLoading ?
                                    <>
                                        <div className='w-full flex justify-center mt-4'>
                                            <p className='text-xs text-thirdgray font-light'>Loading!</p>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='w-full flex justify-center mt-4'>
                                            <p className='text-xs text-thirdgray font-light'>No payments yet!</p>
                                        </div>

                                    </> :payments.map((payment, i) => {
                                    const color = getColor(payment.type);
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
                                                            {payment.type.replace('_', ' ')}
                                                        </h1>
                                                    </div>
                                                </div>
                                                <div
                                                    className="ml-3 my-4 font-extralight group"
                                                    onMouseEnter={() => { }}
                                                >
                                                    <a
                                                        href={`https://explorer.solana.com/tx/${payment.signature}?cluster=devnet`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <ExpandableText
                                                            isExpanded={expandedIndex === i}
                                                            text={payment.signature}
                                                            width={'100%'}
                                                        />
                                                    </a>
                                                </div>
                                                <div className="ml-3 my-4">
                                                    <ExpandableText
                                                        isExpanded={expandedIndex === i}
                                                        text={payment.description}
                                                        width={'100%'}
                                                    />
                                                </div>
                                                <div className="ml-3 my-4">
                                                    <h1 className="truncate">{payment.amount}</h1>
                                                </div>
                                                <div className="ml-3 my-4">
                                                    <h1 className="truncate">
                                                        {payment.result ? <Success /> : <Failure />}
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

export default Payments;




