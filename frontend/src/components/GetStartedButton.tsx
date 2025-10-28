import { useNavigate } from "react-router-dom"

export default function Button({title} : {title : string}){
    const navigate = useNavigate()

    return (
        <>
            <button 
                onClick={()=>{
                    navigate("/connect")
                }}
            className="text-black text-sm px-[1.5rem] py-[0.63rem] bg-gradient-to-tr from-greenStart to-greenEnd rounded-sm cursor-pointer">{title}</button>
        </>
    )
}