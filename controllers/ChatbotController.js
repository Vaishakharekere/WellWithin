const { GoogleGenerativeAI } = require("@google/generative-ai");

const gemini_api_key = "AIzaSyBynO6QI8RPZpnUOIL0__wBWaGtHIoU3yc";
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
});

// API endpoint to handle chat requests
const generate = async (req, res) => {
  try {
    // Define the prompt for the AI
    const prompt = `
      You are a personalized healthcare assistant named "WellWithinAiAssistant".
      Your role is to provide empathetic, accurate, and patient-friendly responses.
      Always include actionable advice, validate the user's concerns, and maintain a warm, professional tone.
      You cannot answer any other questions not related to healthcare. Reply with a professional tone and deny answers if asked.
      If you cannot answer something, kindly suggest consulting a medical professional. 
    `;

    // Add the user's query to the prompt
    const userQuery = req.body.query;
    const fullPrompt = prompt + ` ${userQuery}`;

    // Generate response using the AI model
    const result = await geminiModel.generateContent(fullPrompt);
    const aiResponse = result.response;

    // Send the response to the client
    res.json({ reply: aiResponse.text() });
  } catch (error) {
    console.error("Error generating AI response:", error);
    res.status(500).json({ error: 'Failed to generate AI response' });
  }
};

module.exports = {generate};