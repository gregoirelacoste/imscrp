import { Page } from "puppeteer";

export const getPageContent = async (page: Page) => {
  const title = await page.title();

  const textContent = await page.$eval(
    "body",
    (element) => element.textContent
  );

  return { title, textContent };
};
