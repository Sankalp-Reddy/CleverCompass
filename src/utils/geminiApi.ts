
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const API_KEY = //add your api key here; // This should ideally be stored in environment variables

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(API_KEY);

export async function fetchGeminiResponse(
  userInput: string,
  subject: string,
  imageData?: string
): Promise<string> {
  try {
    // Configure model settings based on subject
    let systemPrompt = '';
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Build system prompt based on subject
    switch(subject) {
      case 'Math':
        systemPrompt = `You are a helpful, supportive math tutor for K-12 students. Explain concepts clearly and provide step-by-step solutions. Use simple language, but make sure to teach proper mathematical terminology. Break down problems methodically. Your responses should be educational, age-appropriate, and encourage mathematical thinking. Always provide multiple examples to illustrate concepts. If the student uploads an image of a math problem, carefully analyze it, identify the type of problem, and provide a detailed solution with explanation.`;
        break;
      case 'Physics':
        systemPrompt = `You are a knowledgeable, encouraging physics tutor for K-12 students. Explain physics concepts using clear examples and intuitive analogies. Connect theoretical principles to real-world applications. Your explanations should include step-by-step problem solving when appropriate, and help students develop both conceptual understanding and mathematical skills in physics. Always use appropriate physics notation and units. If the student uploads images of physics problems, diagrams, or experimental setups, analyze them carefully and provide detailed explanations and solutions.`;
        break;
      case 'Chemistry':
        systemPrompt = `You are a patient, informative chemistry tutor for K-12 students. Explain chemical concepts clearly using proper terminology and notation. Make abstract ideas concrete through examples and visualizations. When explaining reactions or processes, break them down into understandable steps. Emphasize safety and proper lab practices when relevant. Your responses should build chemistry literacy while being accessible to young learners. If the student uploads images of chemical equations, compounds, or diagrams, analyze them carefully and provide detailed explanations.`;
        break;
      default:
        systemPrompt = `You are a helpful educational assistant. Provide clear, accurate information on academic subjects at a K-12 level. Your explanations should be educational, age-appropriate, and encourage critical thinking. For any images uploaded, carefully analyze them and provide relevant explanations or solutions.`;
    }

    // Create the chat session
    const chat = model.startChat({
      generationConfig: {
        temperature: 0.4,
        topP: 0.95,
        topK: 40,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
      history: [
        {
          role: "user",
          parts: [{ text: "Please introduce yourself as an educational tutor" }],
        },
        {
          role: "model",
          parts: [{ text: systemPrompt }],
        },
      ],
    });

    // Prepare the message parts
    const messageParts = [];
    
    // Add text input if provided
    if (userInput) {
      messageParts.push({ text: userInput });
    }
    
    // Add image if provided
    if (imageData) {
      // Parse base64 image data
      const base64Data = imageData.split(',')[1];
      if (base64Data) {
        messageParts.push({
          inlineData: {
            data: base64Data,
            mimeType: "image/jpeg", // Adjust based on actual image type
          },
        });
      }
    }

    // Send message to the model
    const result = await chat.sendMessage(messageParts);
    const response = result.response;
    
    return response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
