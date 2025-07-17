import { openai } from "../openai/setup.js";
import { HttpStatus } from "../utils/http.status.js";

export const handlePrompt = async (req, res) => {
  const { prompt } = req.body;

  const validationPrompt = `
You are an assistant that checks if a website prompt contains:
          - Purpose of the website (e.g., course selling, workshop)
          - Section layout (e.g., header, faq, footer)
          - Color scheme or theme,if not specified use dark theme.
          - Language preference, default is english


User Prompt: "${prompt}"

Respond with:
{
  "is_complete": true | false,
  "missing_fields": [],
  "suggest_questions": []
}
`;

  const validation = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: validationPrompt }],
    temperature: 0,
  });

  const validationResult = JSON.parse(validation.choices[0].message.content);

  // If it's incomplete, ask the frontend to clarify
  if (!validationResult.is_complete) {
    return res.json({
      missing_fields: validationResult.missing_fields,
      suggest_questions: validationResult.suggest_questions,
    });
  }

  const promptData = `Generate a modern website based on this prompt:

"${prompt}",

You are a frontend mentor that generates modular HTML content with inline styles only, compatible with GrapesJS.


Rules:
- Do not use <style> or external classes.
- use modern style with color combination
- use shadow for boxes and hover effect.
- Each section must be clearly separated and editable.
- Use clean HTML (no html, <head>, <body>) and other explanations.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You generate modular HTML with inline styles compatible with GrapesJs.",
        },
        { role: "user", content: promptData },
      ],
      temperature: 0.7,
    });

    const aiHTML = response.choices[0]?.message?.content;
    const cleanedHtml = aiHTML.replace(/^```html|```$/g, "").trim();

    res.status(HttpStatus.CREATED).json({ success: true, html: cleanedHtml });
  } catch (error) {
    console.log("OpenAI Error:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal server error" });
  }
};
