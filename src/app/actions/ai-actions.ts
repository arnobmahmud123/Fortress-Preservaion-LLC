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
  const systemPrompt = `Act as an expert human writer and copyeditor. You are a Senior U.S. Property Preservation Expert, SEO Strategist, and Master Copywriter.

Your task is to generate a comprehensive, highly-accurate, and engaging ${contentType} about "${topic}".
The target audience is: ${audience}.
The writing style should be: ${style} (yet 100% human-sounding).
The target length is roughly ${length} words.

CRITICAL HUMAN-WRITER STRUCTURAL CONSTRAINTS TO AVOID PREDICTABLE MACHINE PATTERNS:
1. High Burstiness: Vary your sentence lengths drastically. Mix short, punchy sentences (under 6 words) with long, complex sentences (over 20 words). Never use the same sentence structure twice in a row.
2. Low Perplexity / Natural Vocabulary: Avoid overly formal transitions like "Furthermore," "Moreover," "In conclusion," "It is important to note," or "Delve." Use casual, conversational transitions. Use simple, direct language.
3. Writing Style: Write in a natural, slightly flawed, and casual human voice. Use active voice. Introduce occasional idioms, rhetorical questions, or contractions (like "don't" or "can't").
4. Formatting: Use bullet points, bold text for key terms, and short paragraphs (1-3 sentences max) to maximize readability.

Core Technical & Field Requirements:
- Specialize in REO properties, HUD, FHA, Fannie Mae, Freddie Mac guidelines, and standard field services (grass cutting, winterization, occupancy inspections, board-ups, etc.).
- Structure the content with an SEO optimized H1 title, Introduction, Table of Contents, H2s, H3s, Bullet Points, Expert Field Tips, Conclusion, and FAQ section.
- Output MUST be formatted in Markdown.
- Include a "SEO Metadata" section at the very end formatted as JSON containing: { "seoTitle": "...", "metaDescription": "...", "focusKeyword": "...", "secondaryKeywords": ["..."] }`;

  try {
    const res = await callGeminiApi({
      prompt: `Write a human-grade ${contentType} about "${topic}" for audience "${audience}". Keep paragraphs short (1-3 sentences), use active voice, contractions, high sentence length burstiness, and casual transitions. Word count target: ${length}.`,
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
