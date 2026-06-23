import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const prompt = `
You are helping parents find baby names.

Generate 6 names similar to this name:

Name: ${body.name}
Meaning: ${body.meaning}
Origin: ${body.origin}
Vibe: ${body.vibe}

Use the same general style, emotional feel, and naming category.

Return ONLY valid JSON.
Do not include markdown.

Format:
[
  {
    "name": "Name",
    "meaning": "Meaning",
    "origin": "Origin",
    "vibe": "Short emotional/style description",
    "whySelected": "Why this name is similar",
    "popularity": "Popular, balanced, uncommon, or rare",
    "nicknames": ["Nickname 1", "Nickname 2"],
    "siblingCompatibility": "A short note about what sibling name styles pair well with this name"
  }
]
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    const names = JSON.parse(response.output_text);

    return NextResponse.json({ names });
  } catch (error) {
    console.error("Similar names error:", error);

    return NextResponse.json(
      { error: "Unable to generate similar names right now." },
      { status: 500 }
    );
  }
}