import { ChevronRightIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function CTAButton({title} : {title : string}){
    const navigate = useNavigate()
    return (
        <>
            <button 
                className="cursor-pointer text-sm flex items-center gap-[0.36rem]"
                onClick={()=>{
                    navigate("/transactions")
                }}
            >
                {title}
                
                <ChevronRightIcon size={15} strokeWidth={2}/>
            </button>
        </>
    )
}