"use server";

import { callGeminiApi } from "@/lib/gemini";

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

  try {
    const res = await callGeminiApi({
      prompt: `Generate the ${contentType} about "${topic}" for audience "${audience}". Style: ${style}. Word count target: ${length}.`,
      systemInstruction: systemPrompt,
      jsonMode: false,
    });

    return { success: true, text: res.text, modelUsed: res.modelUsed };
  } catch (error: unknown) {
    console.error("AI Generation Error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to generate article",
    };
  }
}
