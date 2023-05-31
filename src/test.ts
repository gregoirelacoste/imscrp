import {createCrietriaFromPrompt} from "./domain/criteria/createCrietriaFromPrompt";
import {OpenAIApi} from "openai";
import {Criteria} from "./infra/db/json";

const openAi: OpenAIApi = () => null as OpenAIApi
const crietriaDb = new Criteria()
createCrietriaFromPrompt(openAi, crietriaDb)('maison')