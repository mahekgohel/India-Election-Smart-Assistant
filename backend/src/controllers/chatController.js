const { GoogleGenerativeAI } = require('@google/generative-ai');

const handleChat = async (req, res) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return res.json({ reply: "Mock Response: Gemini API Key is missing. I am your Smart Election Assistant!" });
        }

        const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const { message, context } = req.body;
        
        const systemInstruction = `You are the India Election Smart Assistant. 
        You provide accurate, neutral, and easy-to-understand information about the Election Commission of India (ECI) processes.
        Do NOT show political bias. NEVER promote any political party.
        Answer in simple, easy-to-understand language.
        If applicable, contextualize the answer for a user who is ${context?.age || 'an adult'} years old and lives in ${context?.state || 'India'}.
        End your response with a brief disclaimer if necessary.`;

        const model = ai.getGenerativeModel({ 
            model: 'gemini-1.5-flash',
            systemInstruction: systemInstruction
        });

        const result = await model.generateContent(message);
        const response = await result.response;

        res.json({ reply: response.text() });
    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ error: 'Failed to generate response. Please try again later.' });
    }
};

module.exports = { handleChat };
