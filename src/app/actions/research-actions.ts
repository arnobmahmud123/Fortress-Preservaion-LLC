"use server";

import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

function getGoogleModel() {
  const apiKey =
    process.env.GOOGLE_GEMINI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GOOGLE_GEMINI_API_KEY is missing in your Cloudflare / environment variables. Please add GOOGLE_GEMINI_API_KEY to your environment variables."
    );
  }

  const google = createGoogleGenerativeAI({ apiKey });
  return google("gemini-1.5-flash");
}

export async function conductContentResearch(topic: string) {
  const systemPrompt = `You are a Senior SEO Strategist and Property Preservation Market Analyst.
Analyze the topic: "${topic}".
Provide a comprehensive research briefing that will be used to guide an AI writer.`;

  try {
    const model = getGoogleModel();

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

    return { success: true, research: object };
  } catch (error: unknown) {
    console.error("AI Research Error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to conduct research",
    };
  }
}
