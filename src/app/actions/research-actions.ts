"use server";

import { callGeminiApi } from "@/lib/gemini";

export async function conductContentResearch(topic: string) {
  const systemPrompt = `You are a Senior SEO Strategist and Property Preservation Market Analyst.
Analyze the topic: "${topic}".
Provide a comprehensive research briefing that will be used to guide an AI writer.

Return ONLY a valid JSON object with the following schema:
{
  "keywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4", "keyword 5"],
  "competitorInsights": ["insight 1", "insight 2", "insight 3"],
  "contentGaps": ["gap 1", "gap 2"],
  "recommendedStructure": ["H2 Heading 1", "H2 Heading 2", "H2 Heading 3", "H2 Heading 4"]
}`;

  try {
    const res = await callGeminiApi({
      prompt: `Generate the research brief for topic: "${topic}".`,
      systemInstruction: systemPrompt,
      jsonMode: true,
    });

    const parsedObject = JSON.parse(res.text);
    return { success: true, research: parsedObject, modelUsed: res.modelUsed };
  } catch (error: unknown) {
    console.error("AI Research Error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to conduct research",
    };
  }
}
