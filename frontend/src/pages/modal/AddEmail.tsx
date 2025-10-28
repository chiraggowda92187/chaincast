import axios from 'axios';
import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
import { backendUrl } from '../../utils/misc';
import useLogout from '../../utils/useLogout';

export default function AddEmailModal({
    handleCloseModal,
}: {
    handleCloseModal: () => void;
}) {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState("")
    const [emailSent, setEmaiSent] = useState(false)
    const { logout } = useLogout()

    useEffect(() => {
        console.log(otp);
    }, [otp]);

    const sendEmail = async () => {
        await axios.post(`${backendUrl}/api/notification/email`, {
            email
        }, {
            withCredentials: true
        })
    }


    const handleSubmit = async () => {
        try {
            // Submit logic    
            await sendEmail()
            toast("Otp has been sent to your email address!")
            setEmaiSent(true)
        } catch (error : any) {
            if (error.response.status === 401) {
                // if not authorized log out and disconnect wallet
                await logout()
            }
            toast("There was an error while sending the otp! Please try again after some time!")
        }
    }

    const verifyOtp = async () => {
        await axios.post(`${backendUrl}/api/notification/email/verify`, {
            email,
            otp
        }, {
            withCredentials: true
        })
        
    }

    const handlVerify = async () => {
        try {
            // Submit logic    
            await verifyOtp()
            toast("Email has been verified successfully")

        } catch (error: any) {
            if (error.response.status === 401) {
                // if not authorized log out and disconnect wallet
                await logout()
            }
            toast("There was an error while verifying your email! Please try again after some time!")
        }
    }
    return (
        <>
            <div
                className="absolute w-[100vw] h-[100vh] z-10 bg-black/60 flex flex-col justify-center items-center "
                onClick={handleCloseModal}
            >
                <div
                    className=" w-[81%] h-[81%] bg-red- bg-charcoal rounded-xl border-[1px] border-secondary tracking-[-0.03em]"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="mx-[2rem] my-[2rem] bg-green-10">
                        <h1 className="text-4xl font-bold text-mainwhite">Add Email</h1>
                        <p className="text-thirdgray text-xs font-light mt-2">
                            Adding your email has been never easier <br /> Its as simple as
                            entering your email and verifying!
                        </p>
                        <input
                            type="email"
                            className="bg-black mt-4 border-[1px] border-secondary rounded-md w-[30rem] px-2 py-1 placeholder:text-sm placeholder:text-thirdgray placeholder:font-extralight text-mainwhite text-sm font-light"
                            placeholder="Enter your email"
                            onChange={(e) => {
                                const value = e.target.value
                                setEmail(value.trim())
                            }}
                        />
                        <button
                            onClick={handleSubmit}
                            className="bg-backgroundgray text-mainwhite ml-4 border-[1px] border-secondary px-4 py-2 rounded-md text-xs font-light cursor-pointer">
                            Submit
                        </button>


                        {emailSent && <div className=" mt-8">
                            <h1 className="text-lg font-semibold text-mainwhite">
                                Verify your Email
                            </h1>
                            <p className="text-xs font-light text-thirdgray mb-4">
                                Please enter the otp you have received in your email!
                            </p>
                            <div className="text-secondary">
                                <OtpInput
                                    value={otp}
                                    onChange={(val) => setOtp(val)}
                                    numInputs={4}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} />}
                                    inputStyle={{
                                        backgroundColor: '#1F201D',
                                        width: '2.5rem',
                                        height: '2.5rem',
                                        margin: '0 0.25rem',
                                        color: '#F8F6EC',
                                        border: '1px solid #2A2A2A',
                                        borderRadius: '6px',
                                        textAlign: 'center',
                                        fontSize: '1.2rem',
                                        outline: 'none',
                                    }}

                                />
                            </div>
                            <button
                                onClick={handlVerify}
                                className="bg-backgroundgray text-mainwhite border-[1px] border-secondary px-4 py-2 rounded-md text-xs font-light mt-4">
                                Verify
                            </button>

                        </div>}
                    </div>
                </div>
            </div>
        </>
    );
}
