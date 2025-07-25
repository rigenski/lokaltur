import { openai } from "@ai-sdk/openai";
import type { Message } from "ai";
import {
  convertToCoreMessages,
  StreamData,
  streamText,
  experimental_wrapLanguageModel as wrapLanguageModel,
} from "ai";

export const maxDuration = 60;

const regularPrompt =
  "Berikan informasi tentang suku SUNDA, secara singkat dengan bahasa yang sudah dipilih dan defaultnya bahasa indonesia";

const customModel = (apiIdentifier: string) => {
  return wrapLanguageModel({
    model: openai(apiIdentifier),
    middleware: {},
  });
};

export async function POST(request: Request) {
  const { messages }: { messages: Message[] } = await request.json();

  const model = {
    id: "gpt-4o-mini",
    label: "GPT 4o mini",
    apiIdentifier: "gpt-4o-mini",
    description: "Small model for fast, lightweight tasks",
  };

  if (!model) {
    return new Response("Model not found", { status: 404 });
  }

  const coreMessages = convertToCoreMessages(messages);
  const streamingData = new StreamData();

  const result = await streamText({
    model: customModel("gpt-4o-mini"),
    system: regularPrompt,
    messages: coreMessages,
    maxSteps: 5,

    onFinish: async () => {
      streamingData.close();
    },
    experimental_telemetry: {
      isEnabled: true,
      functionId: "stream-text",
    },
  });

  return result.toDataStreamResponse({
    data: streamingData,
  });
}
