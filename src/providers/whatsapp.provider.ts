import { create } from "venom-bot";
import { logger } from "./winston.provider";
export { Message, Whatsapp } from "venom-bot";

export const getClient = async () => {
  try {
    return await create({
      session: "Chat-GPT",
      multidevice: true,
      logQR: true,
      disableSpins: true,
      logger: logger,
    });
  } catch (error) {
    console.log(error);
    throw Error("Failed to create client");
  }
};
