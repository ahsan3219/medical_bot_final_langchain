import { Configuration, OpenAIApi } from "openai";
export const davinci_pure = async (userMessage) => {
  // console.log("map_prompt", userMessage);
  const configuration = new Configuration({
    apiKey: process.env.api //,malika key
  });

  const openai = new OpenAIApi(configuration);
  const prompt_gpt = userMessage;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt_gpt,
    max_tokens: 400,
    temperature: 0.1
  });
  console.log("response", response.data.choices[0].text);
  return response.data.choices[0].text;
};
