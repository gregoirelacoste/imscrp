import {scrapUrl} from "../services/scraping";
import {askGpt} from "../services/openAi/askGpt";
import {Result} from "../infra/db/json";
import { prompt} from "./ai/prompt";
import {OpenAIApi} from "openai";
import {formatOpenAiRes} from "../services/openAi/response/formatOpenAiRes";


export const getPageInfoFromPrompt = (openAi: OpenAIApi) => async (url: string, result: Result, criteria:string) => {
    try {
        console.log("Get Page Info from prompt");

        const scrappedPage = await scrapUrl(url);
        const res = await askGpt(openAi)({prompt: prompt.pageInfo(scrappedPage, criteria)})
        await result.insert({
            data: formatOpenAiRes(res),
        })

        console.log("RES : ", res?.data?.choices?.[0]?.text)
    } catch (e) {
        throw e
    }

};
