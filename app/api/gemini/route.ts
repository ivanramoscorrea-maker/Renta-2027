import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Lazy initialize Gemini Client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, systemInstruction } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Missing 'prompt' parameter." }, { status: 400 });
    }

    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: systemInstruction
        ? {
            systemInstruction: systemInstruction,
          }
        : undefined,
    });

    const text = response.text || "No se pudo obtener una respuesta de la IA.";
    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error.message || "Error al comunicarse con la Inteligencia Artificial." },
      { status: 500 }
    );
  }
}
