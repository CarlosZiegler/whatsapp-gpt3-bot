import * as whatsappProvider from "./providers/whatsapp.provider";
import * as openAIProvider from "./providers/openAI.provider";
import * as openAIController from "./controllers/openAI.controller";
import { envs } from "./envs";

type CommandsParams = {
  client: whatsappProvider.Whatsapp;
  message: whatsappProvider.Message & { text?: string };
  openAI: openAIProvider.OpenAIApi;
};

const commands = async ({ client, message, openAI }: CommandsParams) => {
  const iaCommands = {
    davinci3: "/gpt",
    dalle: "/dalle",
  };

  const commandsMap = {
    [iaCommands.davinci3]: async () => {
      const question = message?.text?.substring(message?.text?.indexOf(" "));
      if (question) {
        const response = await openAIController.getTextResponse(
          question,
          openAI
        );

        client.sendText(
          message?.from === envs.phoneNumber ? message?.to : message?.from,
          response
        );
      }
    },
    [iaCommands.dalle]: async () => {
      const imgDescription = message?.text?.substring(
        message?.text?.indexOf(" ")
      );
      if (imgDescription) {
        const imgUrl = await openAIController.getImageResponse(
          imgDescription,
          openAI
        );

        client.sendImage(
          message.from === process.env.PHONE_NUMBER ? message.to : message.from,
          imgUrl,
          imgDescription,
          "Image was generated from IA DALL-E 🤖"
        );
      }
    },
  };

  const firstWord = message?.text?.substring(0, message?.text?.indexOf(" "));

  if (!firstWord || !commandsMap[firstWord]) {
    console.log(`No command received from ${message?.from}`);
    return;
  }

  console.log(`Command ${firstWord} received from ${message?.from}`);
  const command = commandsMap[firstWord];

  command?.();
};

async function start() {
  try {
    const client = await whatsappProvider.getClient();
    const openAI = openAIProvider.openAI;
    client.onAnyMessage((message) => commands({ client, message, openAI }));
    console.log(" Bot started successfully");
  } catch (error) {
    console.log(error);
  }
}

start();
