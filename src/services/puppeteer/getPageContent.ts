import { Page } from "puppeteer";

export const getPageContent = async (page: Page) => {

  return  await page.evaluate(() => {
      return document.body.innerText;
  });
};
