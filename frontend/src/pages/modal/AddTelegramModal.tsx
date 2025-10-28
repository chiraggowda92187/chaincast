import axios from 'axios';
import {
  CheckSquare2Icon,
  CopyIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { backendUrl } from '../../utils/misc';
import useLogout from '../../utils/useLogout';
import Loader from '../../components/Loader';

export default function AddTelegramModal({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) {
  const [verifyMessage, setVerifyMessage] = useState('/verify');
  const [copySuccess, setCopySuccess] = useState(false);
  const verifyMsgInputRef = useRef<HTMLInputElement>(null);
  const { logout } = useLogout()
  const [isLoading, setIsLoading] = useState(false)


  const getVerifyId = async () => {
    try {
      // Submit logic   
      setIsLoading(true)
      const res = await axios.post(`${backendUrl}/api/notification/telegram`, {}, {
        withCredentials: true
      })

      setVerifyMessage((prevValue) => `${prevValue} ${res.data.uuid}`)
      setIsLoading(false)
    } catch (error: any) {
      if (error.response.status === 401) {
        // if not authorized log out and disconnect wallet
        await logout()
      }
      toast("There was an error while verifying your email! Please try again after some time!")
    }
  }
  const copyToClipBoard: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const input = verifyMsgInputRef.current;
    if (!input) return;
    if (isLoading) return;
    try {
      await navigator.clipboard.writeText(input.value);
      setCopySuccess(true);
      toast("Telegram verify message copied to clipboard!")
      setTimeout(() => setCopySuccess(false), 1500);
    } catch (err) {
      toast("There was an error while copying!!")
      console.error("Failed to copy text:", err);
    }
  };


  useEffect(() => {
    // Get a verification message
    getVerifyId()
  }, []);

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
            <h1 className="text-4xl font-bold text-mainwhite">
              Add Telegram Notification
            </h1>
            <p className="text-thirdgray text-xs font-light mt-2">
              Adding your telegram has been never easier <br />
              Its as simple as copy pasting a message and verifying!
            </p>

            <h1 className="text-xl font-semibold text-mainwhite mt-12">
              Step 1 : Go to Telegram Agent Cast Bot{' '}
            </h1>
            <p className="text-thirdgray text-xs font-light ">
              Go to our telegram Agent Cast Bot <br />
              <p className="mt-2">
                <a
                  href="https://t.me/AgentCastBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-md underline font-semibold ">
                  Click here to redirect to telegram
                </a>
              </p>
            </p>
            <h1 className="text-xl font-semibold text-mainwhite mt-16">
              Step 2 : Copy paste the message below
            </h1>
            <p className="text-thirdgray text-xs font-light ">
              As the final step to add telegram notification by copy pasting the
              message below!
            </p>
            <input
              disabled={isLoading}
              ref={verifyMsgInputRef}
              value={verifyMessage}
              type="text"
              className="bg-black mt-4 border-[1px] border-secondary rounded-md w-[30rem] px-3 py-2 placeholder:text-sm placeholder:text-thirdgray placeholder:font-extralight text-mainwhite text-sm font-light"
              placeholder="Enter your email"
            />
            <button className="bg-backgroundgray text-mainwhite ml-4 border-[1px] border-secondary px-2 py-2 rounded-md text-xs font-light" onClick={copyToClipBoard}>
              {isLoading ? <Loader /> : copySuccess ? <>
                <CheckSquare2Icon size={12} strokeWidth={2} />
              </> : <CopyIcon size={12} strokeWidth={2} />}
            </button>
            <p className="text-xs font-light text-thirdgray flex items-center gap-2 mt-2">
              Please note this message will be valid for only 5 minutes!
            </p>

          </div>
        </div>
      </div>
    </>
  );
}
