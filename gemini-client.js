import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = 'AIzaSyBjH2BcLukYR3reGuCS8CZc';

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const getGeminiData = async (prompt) => {
    let { text: response } = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return response;
}
