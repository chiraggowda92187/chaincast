import { TransactionType } from "@prisma/client";



export function formatTransactionMessageToTgMsg(data : any) {
  const {
    publicKey,
    amount,
    signature,
    transactionData,
    description,
    type,
    result,
  } = data;

  // Format amount intelligently
  let displayAmount;
  if (typeof amount === "number" && (type === TransactionType.PAYMENT || type === TransactionType.AIRDROP)) {
    // Convert lamports → SOL
    displayAmount = `${(amount / 1e9).toFixed(4)} SOL`;
  } else if (typeof amount === "number" && type === TransactionType.TOKEN_TRANSFER) {
    displayAmount = `${amount} Tokens`;
  } else if (typeof amount === "number" &&type === TransactionType.NFT) {
    displayAmount = `${amount} NFT Asset`;
  } else if (typeof amount === "number" &&type === TransactionType.STAKE) {
    displayAmount = `${(amount / 1e9).toFixed(4)} SOL (staked)`;
  } else if(typeof amount !== "number") {
    displayAmount = amount
  }
  else{
    displayAmount = amount
  }

  // Result emoji
  const status = result === true ? "✅ SUCCESS" : "⚠️ FAILED";

  // Build clean message
  return `
🔔 *New Transaction Alert*

Type: ${type}
Status: ${status}
Amount: ${displayAmount}
Description: ${description || "—"}

Transaction on Public Key: \`${publicKey}\`
Signature: [View on Explorer](https://solscan.io/tx/${signature}?cluster=devnet)
`;
}