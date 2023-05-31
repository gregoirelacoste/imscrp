import {OpenAIApi} from "openai";
import {askGpt} from "../../services/openAi/askGpt";
import {Criteria} from "../../infra/db/json";
import {prompt} from "../ai/prompt";
import {formatOpenAiRes} from "../../services/openAi/response/formatOpenAiRes";


export const createCrietriaFromPrompt = (openAi: OpenAIApi, criteriaDb: Criteria) => async (type: string) => {
   const criteriaExist = criteriaDb.getByType(type)
    if(criteriaExist){
        return criteriaExist.data
    }
    const res = await askGpt(openAi)({prompt: prompt.createCriteria(type), model: "text-davinci-003"})
    await criteriaDb.insert({data: formatOpenAiRes(res), type:type})
    return formatOpenAiRes(res)
}