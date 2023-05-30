import * as fs from "fs";
import * as path from "path";
import { improveSrappedContent } from "./utils/improveSrappedContent";
import { openBrowser } from "./puppeteer/openBrowser";
import { getPageContent } from "./puppeteer/getPageContent";
import { closeBrowser } from "./puppeteer/closeBrowser";
import { goToPageUrl } from "./puppeteer/goToPage";
export const scraping = async (url: string) => {
  // const { browser, page } = await openBrowser();
  // await goToPageUrl(page, url);

  // const { title, textContent } = await getPageContent(page);
  const pathFile = path.join(__dirname, "../../not-optim.html");
  const textContent = fs.readFileSync(pathFile, "utf-8");
  const optimizedPage = textContent && improveSrappedContent(textContent);
  fs.writeFile("saved.html", optimizedPage, (err) => {
    console.log(err);
  });
  console.log("Contenu du corps de la page:", optimizedPage);

  // await closeBrowser(browser);
};
