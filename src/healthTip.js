import { Configuration, OpenAIApi } from "openai";
export const healthTip = async () => {
  // console.log("map_prompt", userMessage);
  const configuration = new Configuration({
    apiKey: process.env.api //,malika key
  });

  const openai = new OpenAIApi(configuration);
  const prompt_gpt = `You are Doc Ethan, your reliable for providing general  health tip.Start with your intro and Provide a list of health tip for health with serial numbers. in 3 points. Always send new and  unique health tips `;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt_gpt,
    max_tokens: 150,
    temperature: 0.1
  });
  // console.log("response", response.data.choices[0].text);
  return response.data.choices[0].text;
};
