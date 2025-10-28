import { useNavigate } from "react-router-dom"

export default function Notfound() {
    const navigate = useNavigate()
    return (
        <>
            <div className="bg-black h-screen w-screen flex flex-col justify-center items-center">
                <h1 className="text-mainwhite text-9xl font-black">404 Page Not found</h1>
                <button onClick={() => { navigate("/transactions") }} className="px-6 py-2 bg-backgroundgray text-mainwhite text-md font-light rounded-sm mt-8">Go To Home</button>
            </div>
        </>
    )
}