import { Configuration, OpenAIApi } from "openai";

import { envs } from "../envs";

const configuration = new Configuration({
  organization: envs.organizationId,
  apiKey: envs.apiKey,
});

const openAI = new OpenAIApi(configuration);

export { openAI, OpenAIApi };
