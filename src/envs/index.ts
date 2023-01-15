import * as dotenv from "dotenv";
dotenv.config();

export const envs = {
  organizationId: process.env.ORGANIZATION_ID,
  apiKey: process.env.OPENAI_KEY,
  phoneNumber: process.env.PHONE_NUMBER,
};
