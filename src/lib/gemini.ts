export async function callGeminiApi({
  prompt,
  systemInstruction,
  jsonMode = false,
}: {
  prompt: string;
  systemInstruction?: string;
  jsonMode?: boolean;
}) {
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

  // NOTE: Only currently-active Gemini models are listed here.
  // Deprecated/shut-down models (gemini-1.0-pro, gemini-2.0-flash,
  // gemini-2.0-flash-exp, gemini-1.5-flash, etc.) have been removed.
  // Gemini "flash" is the default because it is stable, fast, cheap, and
  // supports generateContent with a large context window.
  const models = [
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-2.5-pro",
    "gemini-3-flash-preview",
    "gemini-3.1-pro-preview",
  ];
  let lastError = "";

  for (const modelName of models) {
    try {
      // v1beta is the current, stable, versioned endpoint for generateContent.
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

      const requestBody: any = {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      };

      if (systemInstruction) {
        requestBody.systemInstruction = {
          parts: [{ text: systemInstruction }],
        };
      }

      if (jsonMode) {
        requestBody.generationConfig = {
          responseMimeType: "application/json",
        };
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();

      if (!res.ok) {
        lastError = data.error?.message || `HTTP ${res.status} error from ${modelName}`;
        console.warn(`Gemini model ${modelName} returned error:`, lastError);
        continue;
      }

      const textResult =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (textResult) {
        return { success: true, text: textResult, modelUsed: modelName };
      }
    } catch (e: any) {
      lastError = e.message || "Fetch failed";
    }
  }

  throw new Error(`Gemini API Failed: ${lastError}`);
}
