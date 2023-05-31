import {ScrappedPage} from "../../services/scraping";

const instruction = {
    pageInfo: `Trouve les informations pertinentes dans le texte suivant pour remplir les informations dans le format JSON suivant :`,
    createCriteria: (type: string) => `
Liste les critères d'évaluation de manière exhaustive permettant de comparer plusieurs ${type}. Format attendu : 
{
criteria_snakecase: data_type
}
Préfère les type booléan ou enum au string`
}


export const prompt = {
    pageInfo: (page: ScrappedPage, dataFormat: string) => `
        ${instruction.pageInfo}
        ${dataFormat}
  
        ${page}
        `,
    createCriteria: (type: string) => `${instruction.createCriteria(type)}`
}
