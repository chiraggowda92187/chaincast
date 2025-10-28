import React, { useEffect, useState } from 'react';
import {
    PlusCircleIcon,
    CheckCircle2Icon,
} from 'lucide-react';

import Sidebar from '../components/Sidebar';
import AddEmailModal from './modal/AddEmail';
import AddTelegramModal from './modal/AddTelegramModal';
import TopBar from '../components/TopBar';
import axios from 'axios';
import { backendUrl } from '../utils/misc';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAuthStore } from '../store/userAuthStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


type NotificationType = ({
    type: string;
    title: string;
    description: string;
    userNotificationId: string[];
    setup: boolean;
} | {
    type: string;
    title: string;
    description: string;
    userNotificationId?: undefined;
    setup?: undefined;
})[]


const Notifications: React.FC = () => {

    const { logout } = useAuthStore()
    const { disconnect } = useWallet()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)


    const [modalOpen, setModalOpen] = useState<String | null>(null);
    const handleCloseModal = () => {
        setModalOpen(null);
    };
    const [services, setServices] = useState<NotificationType>([
        {
            type: 'EMAIL',
            title: 'Email Notifications',
            description: 'Receive Email Notifications',
            userNotificationId: [],
            setup: false,
        },
        {
            type: 'TELEGRAM',
            title: 'Telegram Notifications',
            description: 'Receive Telegram Notifications from Agent Cast Bot ',
            userNotificationId: [],
            setup: false,
        },
        {
            type: 'OTHER',
            title: 'Other Notifications',
            description:
                'We are working to bring your favourite app notifications. Stay Tuned!',
        },
    ]);
    const [modals] = useState([
        {
            type: 'EMAIL',
            modal: <AddEmailModal handleCloseModal={handleCloseModal} />,
        },
        {
            type: 'TELEGRAM',
            modal: <AddTelegramModal handleCloseModal={handleCloseModal} />,
        },
    ]);
    const fetchNotifications = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(`${backendUrl}/api/notification`, {
                withCredentials: true
            })
            res.data.notifications.forEach((notification: any) => {
                setServices((prevServices) =>
                    prevServices.map((service) => {
                        if (service.type === notification.type) {
                            return {
                                ...service,
                                userNotificationId: [

                                    notification.notificationId,
                                ],
                                setup: true, // 👈 optional: mark as setup if at least one exists
                            };
                        }
                        return service; // unchanged
                    })
                );
            });
            setIsLoading(false)

        } catch (error: any) {
            if (error.response.status === 401) {
                // disconnect, logout, 
                disconnect()
                logout
                navigate("/connect")
                toast("Please login again!")
            }
            toast("There was an error while fetching your notifications!")
        }
    }
    const refreshButtonHandle = async () => {
        await fetchNotifications()
        toast("Notifications refreshed!")
    }
    useEffect(() => {
        // Fetch Services
        fetchNotifications()
    }, []);

    return (
        <div className="min-h-screen bg-black relative w-[100vw] h-[100vh] leading-[-0.03em] overflow-hidden">
            {/* <TopNav /> */}
            <div className="relative flex w-[100%] h-full">
                {modals.map((modal) => {
                    return <>{modalOpen === modal.type && modal.modal}</>;
                })}

                <Sidebar />
                <div className="pl-[1rem] pt-[1rem] rounded-lg m-2 bg-charcoal w-[100%] h-[100%]  border-[2px] border-secondary/25 ">
                    <div className="space-y-6 max-w-[100%] w-[100%]">
                        <TopBar
                            title={"Notifications"}
                            description={"Setup all your notifications from one place"}
                            refreshButtonHandle={refreshButtonHandle}
                            noRefreshBtn={false}
                        />

                        {/* Content */}
                        <div className="flex flex-col items-center justify-center w-full  text-sm text-secondGray font-extralight tracking-[-0.01rem] leading-[-0.03rem] bg-red-">
                            <div className="h-[1px] w-[90%] bg-secondary my-[1rem] my-[1em]"></div>
                            <div className="flex flex-col justify-center h-full  w-[90%] gap-16">
                                {services.map((service, i) => {
                                    return (
                                        <>
                                            <div className=" h-full " key={i}>
                                                <div className="flex items-center h-full gap-2">
                                                    <h1 className="text-mainwhite text-2xl font-bold">
                                                        {service.title}
                                                    </h1>
                                                    {service.type !== 'OTHER' && (
                                                        <button className="text-mainwhite p-2 rounded-full bg-backgroundgray">
                                                            <PlusCircleIcon
                                                                strokeWidth={2}
                                                                size={15}
                                                                className=" "
                                                                onClick={() => {
                                                                    setModalOpen(service.type);
                                                                }}
                                                            />
                                                        </button>
                                                    )}
                                                </div>
                                                <p className="text-xs">{service.description}</p>
                                                {service.type !== 'OTHER' && (
                                                    <>
                                                        {
                                                            service.userNotificationId &&
                                                            isLoading ?
                                                                <>
                                                                    <p className="text-xs mt-4">
                                                                        Loading!
                                                                    </p>
                                                                </> :
                                                                service.userNotificationId?.length === 0 ?
                                                                (
                                                                    <>
                                                                        <p className="text-xs mt-4">
                                                                            No services added yet!
                                                                        </p>
                                                                    </>
                                                                ) : (
                                                                service.userNotificationId?.map(
                                                                    (uNotification: any, i) => {
                                                                        return (
                                                                            <>
                                                                                <div
                                                                                    key={i}
                                                                                    className="flex items-center gap-2 mt-4"
                                                                                >
                                                                                    <p className="text-thirdgray font-semibold">
                                                                                        {uNotification}
                                                                                    </p>
                                                                                    <CheckCircle2Icon
                                                                                        size={12}
                                                                                        strokeWidth={2}
                                                                                        className="text-greenEnd"
                                                                                    />
                                                                                </div>
                                                                            </>
                                                                        );
                                                                    }
                                                                )
                                                            )}
                                                    </>
                                                )}
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

export default Notifications;




