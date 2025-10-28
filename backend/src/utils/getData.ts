import { TransactionType } from "@prisma/client";
import { getTxnType } from "./getTxnType";
import { getTokenMetaData } from "./getTokenMetaData";

export type HeliusPayLoad = {
  accountData: {
    account: string;
    nativeBalanceChange: number;
    tokenBalanceChanges: {
      mint: string;
      rawTokenAmount: {
        decimals: number;
        tokenAmount: string;
      };
      tokenAccount: string;
      userAccount: string;
    }[];
  }[];

  description: string;

  events: {
    nft?: {
      amount: number;
      buyer: string;
      description: string;
      fee: number;
      feePayer: string;
      nfts: {
        mint: string;
        tokenStandard: string;
      }[];
      saleType: string;
      seller: string;
      signature: string;
      slot: number;
      source: string;
      staker: string;
      timestamp: number;
      type: string;
    };
    [key: string]: any; // in case other event types exist (e.g. token, swap)
  };

  fee: number;
  feePayer: string;

  nativeTransfers: {
    amount: number;
    fromUserAccount: string;
    toUserAccount: string;
  }[];

  signature: string;
  slot: number;
  source: string;
  timestamp: number;

  tokenTransfers: {
    fromTokenAccount: string;
    fromUserAccount: string;
    mint: string;
    toTokenAccount: string;
    toUserAccount: string;
    tokenAmount: number;
    tokenStandard: string;
  }[];

  type: string;
  transactionError: null | JSON
}

export type HeliusSolPaymentData = {
  transactionError: null | JSON
  amount: number; fromUserAccount: string; toUserAccount: string; accountData: {
    account: string;
    nativeBalanceChange: number;
    tokenBalanceChanges: {
      mint: string;
      rawTokenAmount: {
        decimals: number;
        tokenAmount: string;
      };
      tokenAccount: string;
      userAccount: string;
    }[];
  }[]; description: string; events: {
    nft?: {
      amount: number;
      buyer: string;
      description: string;
      fee: number;
      feePayer: string;
      nfts: {
        mint: string;
        tokenStandard: string;
      }[];
      saleType: string;
      seller: string;
      signature: string;
      slot: number;
      source: string;
      staker: string;
      timestamp: number;
      type: string;
    };
    [key: string]: any; // in case other event types exist (e.g. token, swap)
  }; fee: number; feePayer: string; nativeTransfers: {
    amount: number;
    fromUserAccount: string;
    toUserAccount: string;
  }[]; signature: string; slot: number; source: string; timestamp: number; tokenTransfers: {
    fromTokenAccount: string;
    fromUserAccount: string;
    mint: string;
    toTokenAccount: string;
    toUserAccount: string;
    tokenAmount: number;
    tokenStandard: string;
  }[]; type: string;
}


export type HeliusTokenData = {
  transactionError: null | JSON
  fromTokenAccount: string; fromUserAccount: string; mint: string; toTokenAccount: string; toUserAccount: string; tokenAmount: number; tokenStandard: string; accountData: {
    account: string;
    nativeBalanceChange: number;
    tokenBalanceChanges: {
      mint: string;
      rawTokenAmount: {
        decimals: number;
        tokenAmount: string;
      };
      tokenAccount: string;
      userAccount: string;
    }[];
  }[]; description: string; events: {
    nft?: {
      amount: number;
      buyer: string;
      description: string;
      fee: number;
      feePayer: string;
      nfts: {
        mint: string;
        tokenStandard: string;
      }[];
      saleType: string;
      seller: string;
      signature: string;
      slot: number;
      source: string;
      staker: string;
      timestamp: number;
      type: string;
    };
    [key: string]: any; // in case other event types exist (e.g. token, swap)
  }; fee: number; feePayer: string; nativeTransfers: {
    amount: number;
    fromUserAccount: string;
    toUserAccount: string;
  }[]; signature: string; slot: number; source: string; timestamp: number; tokenTransfers: {
    fromTokenAccount: string;
    fromUserAccount: string;
    mint: string;
    toTokenAccount: string;
    toUserAccount: string;
    tokenAmount: number;
    tokenStandard: string;
  }[];
  type: string;

}



const getSolTxnData = (data: HeliusSolPaymentData) => {
  // Straight forward
  // Airdrop or Sol payments
  const txnType = getTxnType(data)
  console.log("Sol TxnData : ", data)
  return {

    signature: data.signature,
    amount: data.nativeTransfers[0].amount,
    result: data.transactionError ? false : true,
    transactionType: txnType,
    transactionSenderData: {
      publicKey: data.nativeTransfers[0].fromUserAccount,
      transactionData: data.nativeTransfers,
      amount: data.nativeTransfers[0].amount
    },
    transactionReceiverData: {
      publicKey: data.nativeTransfers[0].toUserAccount,
      transactionData: data.nativeTransfers,
      amount: data.nativeTransfers[0].amount
    },
    payloadDescription: data.description

  }


}

const getTokenTxnData = async (data: HeliusTokenData) => {
  const txnType = getTxnType(data)
  const metaData = await getTokenMetaData(data.tokenTransfers[0].mint)

  let senderPubKey ;
  let receiverPubKey ;

  switch (txnType) {

    case "NFT":
      senderPubKey = data.events.nft?.seller as string
      receiverPubKey = data.events.nft?.buyer as string
      break;

    case "TOKEN_TRANSFER":
      senderPubKey = data.tokenTransfers[0].fromUserAccount
      receiverPubKey = data.tokenTransfers[0].toUserAccount
      break;

    default:
      break;
  }
  console.log("Token TxnData : ", data)
  return {
    signature: data.signature,
    amount: data.tokenAmount,
    result: data.transactionError ? false : true,
    transactionType: txnType,
    transactionSenderData: {
      publicKey: senderPubKey as string,
      transactionData: data.tokenTransfers,
      amount: data.tokenTransfers[0].tokenAmount
    },
    transactionReceiverData: {
      publicKey: receiverPubKey as string,
      transactionData: data.tokenTransfers,
      amount: data.tokenTransfers[0].tokenAmount
    },
    token: metaData,
    payloadDescription: data.description
  }
}

export const getData = (transactionArray: HeliusPayLoad[]) => {
  const transaction = transactionArray[0]
  // If native solana transfer or token check
  if (transaction.tokenTransfers.length > 0) {
    return getTokenTxnData({ ...transaction, ...transaction.tokenTransfers[0] })
  }
  else {
    return getSolTxnData({ ...transaction, ...transaction.nativeTransfers[0] })
  }
}