import {scraping} from "./services/scraping";
import {openAiStart} from "./services/openAi";
import {askGpt} from "./services/openAi/askGpt";
import {PROMPT} from "./domain/ai/prompt";
import * as fs from "fs";
import {Prompt, Result, SearchCriteria} from "./infra/db/json";

require('dotenv').config()


const searchCriteriaDb = new SearchCriteria()
const promptDb = new Prompt()
const result = new Result()

const run = async () => {
    try {
        console.log("hello world");

        const scrappedPage = await scraping("https://www.midiimmobilier.immo/vente/appartement-t2-2-pieces-albi-81000,VA4309");
        const openAi = await openAiStart()
        const res = await askGpt(openAi, {prompt: PROMPT(scrappedPage)})
        await result.insert({
            data: res?.data?.choices?.[0]?.text
        })

        console.log("RES : ", res?.data?.choices?.[0]?.text)
    } catch (e) {
        throw e
    }

};
run();
