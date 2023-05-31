import {scrapUrl} from "../../services/scraping";
import {askGpt} from "../../services/openAi/askGpt";
import {Criteria, Result} from "../../infra/db/json";
import {prompt} from "../ai/prompt";
import {OpenAIApi} from "openai";
import {formatOpenAiRes} from "../../services/openAi/response/formatOpenAiRes";


type DBoption = {
    result: Result,
    criteriaDb: Criteria
}
type Source = {
    url?: string;
    text?: string;
}
export const getPageInfoFromPrompt = (openAi: OpenAIApi, {
    result,
    criteriaDb
}: DBoption) => async (source: Source, type: string) => {
    try {
        console.log("Get Page Info from prompt");
        const criteria = criteriaDb.getByType(type)
        if (!criteria) return;
        let content = ""
        if (source.url) {
            content = await scrapUrl(source.url);
        }
        if (source.text) {
            content = source.text
        }
        const promptPageInfo = prompt.pageInfo(content, criteria.data)
        const res = await askGpt(openAi)({prompt: promptPageInfo})
        await result.insert({
            data: formatOpenAiRes(res),
            type,
            url: source.url
        })

        console.log("RES : ", res?.data?.choices?.[0]?.text)
    } catch (e) {
        throw e
    }

};
