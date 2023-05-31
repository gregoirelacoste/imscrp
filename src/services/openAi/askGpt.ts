import {createQuery, Query} from "./query";
import {OpenAIApi} from "openai";


export const askGpt = (openai: OpenAIApi) => async (query: Query) => {
    return await openai.createCompletion(createQuery(query));
}