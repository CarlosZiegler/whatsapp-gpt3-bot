import { CreateImageRequest, OpenAIApi } from "openai";

export const getImageResponse = async (
  clientText: string,
  openAI: OpenAIApi
) => {
  const options: CreateImageRequest = {
    prompt: clientText,
    n: 1,
    size: "1024x1024",
  };

  try {
    const response = await openAI.createImage(options);
    const result = response?.data?.data?.[0]?.url;
    return result ? result : "❌ No image generated";
  } catch (e: any) {
    return `❌ OpenAI Response Error: ${e.response.data.error.message}`;
  }
};

export const getTextResponse = async (
  clientText: string,
  openAI: OpenAIApi
) => {
  const options = {
    model: "text-davinci-003",
    prompt: clientText,
    temperature: 1,
    max_tokens: 4000,
  };

  try {
    const response = await openAI.createCompletion(options);

    const result = response.data.choices.map(({ text }) => text).toString();
    return `Chat GPT 🤖\n\n ${result.replace(",", " ")}`;
  } catch (e: any) {
    return `❌ OpenAI Response Error: ${e.response.data.error.message}`;
  }
};
