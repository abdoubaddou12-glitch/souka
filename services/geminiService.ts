
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  async getShoppingAssistantResponse(query: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history,
          { role: 'user', parts: [{ text: `أنت مساعد تسوق ذكي لمتجر "سوقنا" (Souqna). ساعد المستخدم في العثور على أفضل العروض والمنتجات. الاستفسار: ${query}` }] }
        ],
        config: {
          systemInstruction: "أنت مساعد تسوق ودود وخبير لمنصة 'سوقنا'. لغتك هي العربية بلهجة مهذبة وواضحة. هدفك هو مساعدة العملاء في اختيار المنتجات المناسبة، شرح المواصفات، وتقديم نصائح شرائية ذكية.",
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "عذراً، واجهت مشكلة في معالجة طلبك. حاول مرة أخرى لاحقاً.";
    }
  }

  async searchWithGrounding(query: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `ما هي أفضل ${query} المتوفرة في السوق حالياً وما هي مميزاتها؟ اعطني روابط للمراجعات إن أمكن.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text;
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      
      return { text, sources };
    } catch (error) {
      console.error("Search Grounding Error:", error);
      return { text: "تعذر الحصول على نتائج بحث دقيقة حالياً.", sources: [] };
    }
  }
}

export const geminiService = new GeminiService();
