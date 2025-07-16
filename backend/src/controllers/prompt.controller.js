import { openai } from "../openai/setup.js";
import { HttpStatus } from "../utils/http.status.js";

export const handlePrompt = async (req, res) => {
  const { purpose, sections, colorScheme, typography, brandName, language } =
    req.body;

  if (
    !purpose ||
    !sections ||
    !colorScheme ||
    !typography ||
    !brandName ||
    !language
  ) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ success: false, message: "All fields required" });
  }

  const prompt = `
You are an assistant that generates modular HTML content with inline styles only, compatible with GrapesJS.

Brand: ${brandName}
Purpose: ${purpose}
Sections: ${sections.join(", ")}
Color Scheme: ${colorScheme}
Typography: ${typography}
Language: ${language}

Rules:
- Use inline CSS only.
- Do not use <style>, <script>, or external classes.
- Use only <div>, <h1>-<h4>, <p>, <img>, <button>.
- Each section must be clearly separated and editable.
- Return ONLY valid HTML — no extra descriptions or explanations.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You generate modular HTML with inline styles for a visual website editor.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const aiHTML = response.choices[0]?.message?.content;

    console.log(aiHTML)
    if (!aiHTML) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "No response from AI" });
    }

    res.status(HttpStatus.CREATED).json({ success: true, html: aiHTML });
  } catch (error) {
    console.log("OpenAI Error:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal server error" });
  }
};
