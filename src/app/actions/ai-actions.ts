"use server";

import { generateText } from "ai";
import { getGeminiProvider } from "@/lib/gemini";

export async function generatePropertyPreservationArticle({
  topic,
  audience,
  contentType,
  style,
  length,
}: {
  topic: string;
  audience: string;
  contentType: string;
  style: string;
  length: string;
}) {
  const systemPrompt = `You are a Senior U.S. Property Preservation Expert, SEO Strategist, and Master Copywriter. 
Your task is to generate a comprehensive, highly-accurate, and engaging ${contentType} about "${topic}".
The target audience is: ${audience}.
The writing style should be: ${style}.
The target length is roughly ${length} words.

Requirements:
- Specialize in REO properties, HUD, FHA, Fannie Mae, Freddie Mac guidelines, and standard field services (grass cutting, winterization, etc.).
- Structure the content with an SEO optimized H1 title, Introduction, Table of Contents, H2s, H3s, Bullet Points, Expert Tips, Conclusion, and FAQ section.
- Output MUST be formatted in Markdown.
- Include a "SEO Metadata" section at the very end formatted as JSON containing: { "seoTitle": "...", "metaDescription": "...", "focusKeyword": "...", "secondaryKeywords": ["..."] }`;

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

      const { text } = await generateText({
        model,
        system: systemPrompt,
        prompt: `Generate the ${contentType} now. Make it institutional-grade quality.`,
        temperature: 0.7,
      });

      return { success: true, text, usedModel: modelName };
    } catch (err: unknown) {
      console.warn(`Model ${modelName} failed, trying next fallback:`, err);
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }

  return {
    success: false,
    error: lastError?.message || "Failed to generate article with Gemini models.",
  };
}
