import React from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

const Stake: React.FC = () => {
    
    
    const refreshButtonHandle = ()=>{

    }
    return (
        <div className="min-h-screen bg-black relative w-[100vw] h-[100vh] leading-[-0.03em] overflow-hidden">
            {/* <TopNav /> */}
            <div className="flex w-[100%] h-full">
                <Sidebar />
                <div className="pl-[1rem] pt-[1rem] rounded-lg m-2 bg-charcoal w-[100%] h-[100%]  border-[2px] border-secondary/25 ">
                    <div className="space-y-6 max-w-[100%] w-[100%]">
                        <TopBar
                            title={"Staking"}
                            description={"Stake your assets efficiently and stay informed with real-time on-chain tracking and instant activity notifications."}
                            refreshButtonHandle={refreshButtonHandle}
                        />
                        

                        {/* Content */}
                        <div className="flex flex-col items-center justify-center w-full h-[100%] text-sm text-secondGray font-extralight tracking-[-0.01rem] leading-[-0.03rem]">
                            <div className="h-[1px] w-[90%] bg-secondary my-[1rem] my-[1em]"></div>
                            <div className="flex flex-col justify-center h-full items-center">


                                <h1 className="text-5xl font-bold text-mainwhite mt-[0.5em]">
                                    Under Construction
                                </h1>
                                <h1 className="mt-[1rem] ">
                                    Currently we are working to bring your favorutie service
                                </h1>
                                <h1>Stay Tuned!</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stake;


