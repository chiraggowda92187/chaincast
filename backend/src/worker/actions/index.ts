import { NotificationType } from "@prisma/client";
import { sendEmail, sendTelegramMessage } from "./actions";

export const actions = {
    EMAIL : sendEmail,
    TELEGRAM : sendTelegramMessage,
    SMS : ()=>{}
}


