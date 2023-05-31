import {ScrappedPage} from "../../services/scraping";

const instruction = {
    createCriteria: (type: string) => `
Liste les critères d'évaluation de manière exhaustive permettant de comparer plusieurs ${type}. Format attendu : 
{
"criteria_snakecase":"data_type"
}
Préfère les type booléan ou enum au string`
}


export const prompt = {
    pageInfo: (page: ScrappedPage, dataFormat: string) => `Depuis le texte suivant :\n${page}\nUtilise les informations pour compléter le JSON suivant :\n${dataFormat}`,
    createCriteria: (type: string) => `${instruction.createCriteria(type)}`
}
