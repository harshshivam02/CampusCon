// adviceController.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAmYoFAc4_hkk2HOa1vSlLwEUTx-dXod5U");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Fetch career advice
export const getCareerAdvice = async (req, res) => {
    const { question } = req.body;

    try {
        const result = await model.generateContent(` ${question}`);
        const advice = result.response.text();
        res.status(200).json({ advice });
    } catch (error) {
        console.error('Error fetching advice:', error);
        res.status(500).json({ error: 'Error fetching career advice' });
    }
};
