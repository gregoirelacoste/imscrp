import {OpenAIApi} from "openai";
import {askGpt} from "../../services/openAi/askGpt";
import {Criteria} from "../../infra/db/json";
import {prompt} from "../ai/prompt";
import {formatOpenAiRes} from "../../services/openAi/response/formatOpenAiRes";


export const createCrietriaFromPrompt = (openAi: OpenAIApi, criteriaDb: Criteria) => async (userPrompt: string) => {
   const res = await askGpt(openAi)({prompt: prompt.createCriteria(userPrompt), model: "text-davinci-003"})
    await criteriaDb.insert({data: formatOpenAiRes(res)})

}