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

Create 6 baby name suggestions based on these preferences:

Parent 1 First Name: ${body.parent1First || "Not provided"}
Parent 1 Middle Name: ${body.parent1Middle || "Not provided"}
Parent 2 First Name: ${body.parent2First || "Not provided"}
Parent 2 Middle Name: ${body.parent2Middle || "Not provided"}

Baby Gender Preference: ${body.gender || "No preference"}
Name Style: ${body.style || "No preference"}
Name Length: ${body.length || "No preference"}
Popularity Preference: ${body.popularity || "No preference"}
Preferred Origins: ${
      body.origins?.length ? body.origins.join(", ") : "No preference"
    }
Extra Notes: ${body.notes || "None"}

Return ONLY valid JSON.
Do not include markdown.
Do not include explanation.

Format:
[
  {
    "name": "Name",
    "meaning": "Meaning",
    "origin": "Origin",
    "vibe": "Short emotional/style description",
    "whySelected": "Why this name fits the user's preferences",
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

    const text = response.output_text;
    const names = JSON.parse(text);

    return NextResponse.json({ names });
  } catch (error) {
    console.error("Name generation error:", error);

    return NextResponse.json(
      { error: "Unable to generate names right now." },
      { status: 500 }
    );
  }
}