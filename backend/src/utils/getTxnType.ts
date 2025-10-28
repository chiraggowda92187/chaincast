import { TransactionType } from "@prisma/client"
import { HeliusSolPaymentData, HeliusTokenData } from "./getData"

export const getTxnType = (data : HeliusSolPaymentData | HeliusTokenData)=>{
    // if(data.type === "TRANSFER" && )
    if(data.type.includes("NFT") && data.tokenTransfers.length > 0){
        return TransactionType.NFT
    }
    else if(data.type.includes("STAK") && data.tokenTransfers.length > 0){
        return TransactionType.STAKE
    }
    else if(data.type.includes("ESCROW")){
        return TransactionType.ESCROW
    }
    else if(data.type ==="TRANSFER" && data.source === "SOLANA_PROGRAM_LIBRARY"){
        return TransactionType.TOKEN_TRANSFER
    }
    else if(data.nativeTransfers.length > 0 ){
        return TransactionType.PAYMENT
    }
    else{
        return TransactionType.AIRDROP
    }
}