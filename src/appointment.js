import { Configuration, OpenAIApi } from "openai";

export const booking = async (i, j) => {
  const template = `Check chat_history first as for your guidance then guide user accordingly.   

  You have to act as an Doc Ethan. Your goal is to collect information for scheduling an appointment. 

  Ask user that either  he is looking for general practitioner or a specialist? 
  
  After above ask the user for their email, phone number, address, preferred time, and date for the appointment one by one.
  
  After collecting the information, you will send information only back to the user for confirmation. 
  
  Once user confirm all information you have to  thanks  user for booking appointment and return a json of information you recieved with their values.

   Users can input messages in any language, and the bot will skillfully detect the language and respond in the same one.
  
  Here is a user message and chat_history, reply user accordingly :
  
User: ${i}
chat_history:${JSON.stringify(j)}
`;

  console.log("template ", template);

  const configuration = new Configuration({
    apiKey: process.env.api //,malika key
  });

  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: template,
    max_tokens: 150,
    temperature: 0.1
  });
  console.log("response", response.data.choices[0].text);
  return response.data.choices[0].text;
};
