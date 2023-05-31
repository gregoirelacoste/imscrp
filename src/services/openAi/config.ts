import {Configuration, OpenAIApi} from "openai";


export const openAiStart = async (): Promise<OpenAIApi> => {
    const configuration = new Configuration({
        organization: process.env.OPENAI_ORG,
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    console.log("openai ok")


    return openai
}