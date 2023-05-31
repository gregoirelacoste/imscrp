import {improveSrappedContent} from "./utils/improveSrappedContent";
import {openBrowser} from "../puppeteer/openBrowser";
import {getPageContent} from "../puppeteer/getPageContent";
import {closeBrowser} from "../puppeteer/closeBrowser";
import {goToPageUrl} from "../puppeteer/goToPage";


export type ScrappedPage = string

export const scrapUrl = async (url: string): Promise<ScrappedPage> => {
    const {browser, page} = await openBrowser();
    await goToPageUrl(page, url);

    const textContent = await getPageContent(page);
    const optimizedPageContent = textContent && improveSrappedContent(textContent);

    await closeBrowser(browser);
    if (!optimizedPageContent) throw new Error("Pas de contenu");

    return optimizedPageContent

};
