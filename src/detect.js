import { Configuration, OpenAIApi } from "openai";
export const davinciDetect = async (userMessage) => {
  console.log("backend", userMessage);
  const configuration = new Configuration({
    apiKey: process.env.api //,malika key
  });
  const openai = new OpenAIApi(configuration);
  const prompt_gpt = `To detect user intent, you need to identify the following categories:

  1. Greeting
  2. Near Medical Center
  3. Book Appointment
  4. Symptom Checker
  5. Health Tip
  6. General Health Question
  
  To assist you in detecting these intents, provide appropriate responses:
  
  - If the user says "Hi": Respond with "Greeting"
  - If the user says "Tell me about the nearest medical clinic": Respond with "Near Medical Center"
  - If the user says "I want to book an appointment" or "Can you schedule a meeting?": Respond with "Book Appointment"
  - If the user asks about symptoms: Respond with "Symptom Checker"
  - If the user asks for a health tip: Respond with "Health Tip"
  - If the user asks a general health-related question: Respond with "Ask a question

  ". 
  
  userInput:${userMessage}
  Only return the name of category in this json format:{"value":answer}
  `;
  console.log("prompt_gpt", prompt_gpt);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt_gpt,
    max_tokens: 300,
    temperature: 0
  });
  console.log("response", response.data.choices[0].text);
  console.log(response);
  return response.data.choices[0].text;
};
