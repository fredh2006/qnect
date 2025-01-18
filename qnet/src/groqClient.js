import Groq from "groq-sdk";

const groq = new Groq({ apiKey: "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", dangerouslyAllowBrowser: true, });

export async function getGroqResponse(prompt) {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error communicating with Groq API:", error);
    throw new Error("Failed to get a response from Groq API.");
  }
}
