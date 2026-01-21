
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSystemInsight = async (context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As an AI Management Assistant for Smart Education Center, analyze this data and provide a brief, professional 2-sentence summary/insight: ${context}`,
      config: {
        systemInstruction: "You are an expert education management consultant. Keep responses concise, helpful, and data-driven.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Unable to generate AI insights at this moment.";
  }
};

export const generateCourseSuggestion = async (studentProfile: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on this student profile: ${studentProfile}, suggest 3 relevant advanced courses they might be interested in. Return only the course names as a comma-separated list.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Suggestion Error:", error);
    return "Data Science Pro, Advanced UI Design, AI Ethics";
  }
};

export const getOnboardingWelcome = async (name: string, course: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a highly encouraging, professional 2-sentence welcome message for a new student named ${name} who just enrolled in ${course}. Mention one key skill they will master.`,
      config: {
        systemInstruction: "You are a friendly and inspiring academic advisor. Your goal is to make the student feel excited about their new journey.",
        temperature: 0.8,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Onboarding Error:", error);
    return `Welcome aboard, ${name}! We're thrilled to have you in the ${course} program. Get ready to transform your career!`;
  }
};
