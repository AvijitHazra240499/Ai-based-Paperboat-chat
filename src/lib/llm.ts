import { ChatOpenAI } from "@langchain/openai";

// Using OpenRouter API with free model
const openRouterConfig = {
  modelName: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
  configuration: {
    baseURL: process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1",
  },
  openAIApiKey: process.env.OPENROUTER_API_KEY,
  verbose: true,
  temperature: 0,
};

export const streamingModel = new ChatOpenAI({
  ...openRouterConfig,
  streaming: true,
});

export const nonStreamingModel = new ChatOpenAI({
  ...openRouterConfig,
  streaming: false,
});
