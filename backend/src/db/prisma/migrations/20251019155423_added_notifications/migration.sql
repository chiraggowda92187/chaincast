-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "notificationId" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_publicKey_fkey" FOREIGN KEY ("publicKey") REFERENCES "User"("publicKey") ON DELETE RESTRICT ON UPDATE CASCADE;
