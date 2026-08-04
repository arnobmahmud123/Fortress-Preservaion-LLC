"use server";

import { generateObject } from "ai";
import { getGeminiProvider } from "@/lib/gemini";
import { z } from "zod";

export async function conductContentResearch(topic: string) {
  const systemPrompt = `You are a Senior SEO Strategist and Property Preservation Market Analyst.
Analyze the topic: "${topic}".
Provide a comprehensive research briefing that will be used to guide an AI writer.`;

  const modelsToTry = [
    "gemini-1.5-flash-latest",
    "gemini-2.0-flash",
    "gemini-1.5-pro-latest",
    "gemini-1.5-flash"
  ];

  let lastError: Error | null = null;
  const google = getGeminiProvider();

  for (const modelName of modelsToTry) {
    try {
      const model = google(modelName);

      const { object } = await generateObject({
        model,
        system: systemPrompt,
        prompt: "Generate the research brief.",
        schema: z.object({
          keywords: z
            .array(z.string())
            .describe(
              "List of 5-8 highly relevant SEO keywords with good search volume in property preservation"
            ),
          competitorInsights: z
            .array(z.string())
            .describe(
              "3-5 key points that competitors usually cover for this topic"
            ),
          contentGaps: z
            .array(z.string())
            .describe(
              "2-3 unique angles or missing information in typical competitor articles"
            ),
          recommendedStructure: z
            .array(z.string())
            .describe("A proposed list of H2 headings for the article"),
        }),
      });

      return { success: true, research: object, usedModel: modelName };
    } catch (err: unknown) {
      console.warn(`Model ${modelName} failed, trying next fallback:`, err);
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }

  return {
    success: false,
    error: lastError?.message || "Failed to conduct research with Gemini models.",
  };
}
