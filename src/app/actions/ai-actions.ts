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
4. Formatting: Use short paragraphs (1-3 sentences max) to maximize readability.

Core Technical & Field Requirements:
- Specialize in REO properties, HUD, FHA, Fannie Mae, Freddie Mac guidelines, and standard field services (grass cutting, winterization, occupancy inspections, board-ups, etc.).
- Structure the content with an SEO optimized H1 (using <h1>), Introduction, H2s (using <h2>), H3s (using <h3>), bullet lists (using <ul>/<li>), Expert Field Tips (using <blockquote>), and FAQ section.
- Output MUST be formatted in clean, semantic HTML. Do not wrap the output in any markdown block like \`\`\`html or \`\`\`xml. Just return the raw HTML string.

IMAGE INTEGRATION CONSTRAINTS:
You MUST include exactly 1 or 2 relevant topic-matched images inside the HTML content. Place them logically at transition points (e.g. before an <h2> section).
For each image, use a standard <img> tag with the exact classes:
class="rounded-2xl border border-slate-800 shadow-md my-6 w-full max-w-2xl mx-auto object-cover aspect-[16/10]"

Select the image src URLs from the following list of high-quality verified stock photos:
- Grass Cutting / Landscaping: https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=800&h=500&q=80
- Green Grass Lawn: https://images.unsplash.com/photo-1533460004989-cef01064af7e?auto=format&fit=crop&w=800&h=500&q=80
- Empty Abandoned Home Exterior (Inspections / Foreclosure): https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&h=500&q=80
- Padlock & Keys (Board-up / Property Security): https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&h=500&q=80
- Winterization / Pipes Check: https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&h=500&q=80
- Roof Repair / Renovation Work: https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&h=500&q=80
- Trashout Cleaning / Interior Debris: https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&h=500&q=80
- Paperwork Audit / Compliance: https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&h=500&q=80

At the very end of your response, append an "SEO Metadata" section formatted inside a JSON code block like this:
\`\`\`json
{ "seoTitle": "...", "metaDescription": "...", "focusKeyword": "...", "secondaryKeywords": ["..."] }
\`\`\``;

  try {
    const res = await callGeminiApi({
      prompt: `Write a human-grade ${contentType} about "${topic}" for audience "${audience}" in raw HTML format. Keep paragraphs short (1-3 sentences), use active voice, contractions, high sentence length burstiness, and casual transitions. Word count target: ${length}. Include 1-2 appropriate images from the specified list.`,
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
