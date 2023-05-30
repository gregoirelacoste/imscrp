import {createQuery, Query} from "./query";
import {OpenAIApi} from "openai";


export const askGpt = async (openai: OpenAIApi, query: Query) => {
    return await openai.createCompletion(createQuery(query));
}