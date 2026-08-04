import { createGoogleGenerativeAI } from "@ai-sdk/google";

export function getGeminiProvider() {
  const apiKey =
    process.env.GOOGLE_GEMINI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GOOGLE_GEMINI_API_KEY is missing. Please add GOOGLE_GEMINI_API_KEY to your Cloudflare environment variables."
    );
  }

  return createGoogleGenerativeAI({ apiKey });
}

export function getGeminiModel(modelName = "gemini-1.5-flash-latest") {
  const google = getGeminiProvider();
  return google(modelName);
}
