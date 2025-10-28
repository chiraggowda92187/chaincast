/*
  Warnings:

  - A unique constraint covering the columns `[publicKey,signature]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Transaction_publicKey_signature_key" ON "Transaction"("publicKey", "signature");
