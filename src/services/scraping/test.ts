import * as fs from "fs";
import * as path from "path";
import {improveSrappedContent} from "./utils/improveSrappedContent";

export const testscraping = async () => {
    const pathFile = path.join(__dirname, "../../not-optim.html");
    const textContent = fs.readFileSync(pathFile, "utf-8");
    const optimizedPage = textContent && improveSrappedContent(textContent);
    fs.writeFile("saved.html", optimizedPage, (err) => {
        console.log(err);
    });
    console.log("Contenu du corps de la page:", optimizedPage);

    // await closeBrowser(browser);
};
