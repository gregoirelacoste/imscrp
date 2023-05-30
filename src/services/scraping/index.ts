import * as fs from "fs";
import * as path from "path";
import {improveSrappedContent} from "./utils/improveSrappedContent";
import {openBrowser} from "../puppeteer/openBrowser";
import {getPageContent} from "../puppeteer/getPageContent";
import {closeBrowser} from "../puppeteer/closeBrowser";
import {goToPageUrl} from "../puppeteer/goToPage";


export type ScrappedPage = string

export const scraping = async (url: string): Promise<ScrappedPage> => {
    const {browser, page} = await openBrowser();
    await goToPageUrl(page, url);

    const textContent = await getPageContent(page);
    const optimizedPageContent = textContent && improveSrappedContent(textContent);
    fs.writeFile("saved.html", optimizedPageContent, (err) => {
        console.log(err);
    });
    await closeBrowser(browser);
    return optimizedPageContent

};
