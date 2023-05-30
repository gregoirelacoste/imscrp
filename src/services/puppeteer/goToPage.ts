import { Page } from "puppeteer";

export const goToPageUrl = async (page: Page, url: string) => {
  try {
    await page.setDefaultNavigationTimeout(60000);
    await page.goto(url);
    console.log("Page opened");

    return true;
  } catch (e) {
    throw e;
  }
};
