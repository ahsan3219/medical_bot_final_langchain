import { Configuration, OpenAIApi } from "openai";
import nlp from "compromise";
import { getUserLocation } from "./map.js";
export const davinci = async (userMessage) => {
  console.log("backend", userMessage);
  const configuration = new Configuration({
    apiKey: process.env.api //,malika key
  });

  const openai = new OpenAIApi(configuration);

  // Detect user intent using the compromise library
  async function detectUserIntent(input) {
    const doc = nlp(input);

    if (doc.has("appointment") || doc.has("book") || doc.has("schedule")) {
      console.log(
        "Sure, we can help you book an appointment. Please provide more details."
      );
      const prompt_gpt = `You are the Appointment Bot. Your goal is to collect information for scheduling an appointment. You will ask the user for their name, username, email, phone number, address, preferred time, and date for the appointment. After collecting the information, you will read it back to the user for confirmation and once it is confirm then send a  json of the information on last.
  start asking question one by one as above`;
      return prompt_gpt;
    } else if (
      doc.has("hospital") ||
      doc.has("medical center") ||
      doc.has("clinic")
    ) {
      // const result =  getUserLocation();
      // setTimeout((result) => {
      //   console.log("result", typeof result, result);
      // }, 5000);
      // console.log("result", typeof result, result);

      getUserLocation()
        .then((result) => {
          console.log("result121", typeof result, result);

          // setTimeout((result) => {
          //   console.log("result", typeof result, result);
          // }, 10000); // 3000 milliseconds = 3 seconds
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });

      const prompt_gpt = `You are a chatbot who tell user about near hospital in a great way.Use this format:
    
      `;
      return prompt_gpt;
    } else if (doc.has("medication") || doc.has("medicine")) {
      console.log(
        "If you need information about medication, we're here to help."
      );
    } else if (
      doc.has("healthcare") ||
      doc.has("health") ||
      doc.has("wellness")
    ) {
      console.log(
        "General healthcare inquiries are welcome. Feel free to ask."
      );
    } else if (
      doc.has("symptoms") ||
      doc.has("check symptoms") ||
      doc.has("health symptoms")
    ) {
      console.log(
        "If you're experiencing symptoms and need assistance, we're here for you."
      );
    } else {
      console.log("I'm sorry, I couldn't understand your request.");
    }
  }

  const prompt_gpt = await detectUserIntent(userMessage);
  console.log("prompt_gpt", prompt_gpt);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt_gpt,
    max_tokens: 200,
    temperature: 0
  });
  console.log("response", response.data.choices[0].text);
  console.log(response);
  return response.data.choices[0].text;
};
