import {Criteria, Result} from "./infra/db/json";
import {openAiStart} from "./services/openAi/config";
import {getPageInfoFromPrompt} from "./domain/result/getPageInfoFromPrompt";
import {createCrietriaFromPrompt} from "./domain/criteria/createCrietriaFromPrompt";

const text = "Fabricant \t‎BLACK+DECKER\n" +
    "Dimensions du produit (L x l x h) \t‎0,1 x 0,1 x 0,1 cm; 17,47 kilogrammes\n" +
    "Référence \t‎BEMW481BH-QS\n" +
    "Taille \t‎1800W\n" +
    "Couleur \t‎Orange\n" +
    "Style \t‎1800 W\n" +
    "Motif \t‎Unique\n" +
    "Type d'alimentation \t‎Câble électrique\n" +
    "Tension \t‎230 Volts\n" +
    "Watt \t‎1800 Watts\n" +
    "Quantité d'articles \t‎1\n" +
    "Nombre de pièces \t‎1\n" +
    "Système de mesure \t‎Metric\n" +
    "Composants inclus \t‎1 tondeuse\n" +
    "Piles incluses ? \t‎Non\n" +
    "Batterie(s) / Pile(s) requise(s) \t‎Non\n" +
    "Poids \t‎17,47 Kilogrammes\n" +
    "Garantie constructeur \t‎Garantie fabricant : 2 ans.\n" +
    "Disponibilité des pièces détachées \t‎Information indisponible sur les pièces détachées"

require('dotenv').config()

const criteriaDb = new Criteria()
const result = new Result()
 openAiStart().then(res => {
    getPageInfoFromPrompt(res, {
        result,
        criteriaDb
    })({text }, "tondeuse electrique sans fil");
    // createCrietriaFromPrompt(res, criteriaDb)("tondeuse electrique sans fil")
})


