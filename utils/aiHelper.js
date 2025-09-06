// utils/aiHelper.js
import dotenv from "dotenv";
dotenv.config();

let openai = null;

// Load OpenAI SDK only if API key is provided
if (process.env.OPENAI_API_KEY) {
  const { OpenAI } = await import("openai");
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

/**
 * Enhance website description using OpenAI (if API key is set).
 * Falls back to original description if no key or API error.
 */
export const enhanceDescription = async (text) => {
  if (!openai) {
    // No API key → just return original
    return text;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that rewrites website descriptions in a clear, concise, and engaging way.",
        },
        { role: "user", content: text || "No description available." },
      ],
      max_tokens: 80,
    });

    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error("AI enhancement failed:", err.message);
    return text; // fallback
  }
};
