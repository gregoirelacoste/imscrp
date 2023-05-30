import {ScrappedPage} from "../../services/scraping";

const instruction = `Trouve les informations pertinentes dans le texte suivant pour remplir les informations dans le format JSON suivant :`

const dataFormat = `
{
    price:number;
    address:string;
    title:string;
    surface:number;
  }`

export const PROMPT = (page: ScrappedPage) => `
  ${instruction}
  ${dataFormat}
  
  ${page}
`;