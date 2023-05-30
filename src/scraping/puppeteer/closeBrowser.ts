import { Browser } from "puppeteer";

export const closeBrowser = async (browser: Browser) => {
  await browser.close();
};
