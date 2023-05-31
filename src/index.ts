import {Criteria, Prompt, Result} from "./infra/db/json";
import {openAiStart} from "./services/openAi/config";
import {createCrietriaFromPrompt} from "./domain/criteria/createCrietriaFromPrompt";

require('dotenv').config()

const criteriaDb = new Criteria()
const promptDb = new Prompt()
const result = new Result()
const openAi = openAiStart().then(res => {
    // getPageInfoFromPrompt(openAi)("https://www.midiimmobilier.immo/vente/appartement-t2-2-pieces-albi-81000,VA4309", result);
    createCrietriaFromPrompt(res, criteriaDb)("tondeuse")
})


