"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generatePropertyPreservationArticle({
  topic,
  audience,
  contentType,
  style,
  length,
}: {
  topic: string
  audience: string
  contentType: string
  style: string
  length: string
}) {
  // In a full production system, we would:
  // 1. Research competitor articles via SERP API
  // 2. Perform Keyword extraction
  // 3. Chain multiple LLM calls (Outline -> Section 1 -> Section 2 -> SEO Meta)
  
  // For Phase 2 initialization, we use a comprehensive prompt.
  
  const systemPrompt = `You are a Senior U.S. Property Preservation Expert, SEO Strategist, and Master Copywriter. 
Your task is to generate a comprehensive, highly-accurate, and engaging ${contentType} about "${topic}".
The target audience is: ${audience}.
The writing style should be: ${style}.
The target length is roughly ${length} words.

Requirements:
- Specialize in REO properties, HUD, FHA, Fannie Mae, Freddie Mac guidelines, and standard field services (grass cutting, winterization, etc.).
- Structure the content with an SEO optimized H1 title, Introduction, Table of Contents, H2s, H3s, Bullet Points, Expert Tips, Conclusion, and FAQ section.
- Output MUST be formatted in Markdown.
- Include a "SEO Metadata" section at the very end formatted as JSON containing: { "seoTitle": "...", "metaDescription": "...", "focusKeyword": "...", "secondaryKeywords": ["..."] }`

  try {
    const { text } = await generateText({
      model: openai("gpt-4-turbo"),
      system: systemPrompt,
      prompt: `Generate the ${contentType} now. Make it institutional-grade quality.`,
      temperature: 0.7,
    })

    return { success: true, text }
  } catch (error: unknown) {
    console.error("AI Generation Error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate article",
    }
  }
}
