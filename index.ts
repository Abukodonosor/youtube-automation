import { AccumulatorObject, scrapingSteps } from "./src/scenarios";
import { writeJSONToFile } from "./src/lib/helpers";
import { HPuppeteerFacade } from "./src/lib/puppeteer";

(async () => {
  let res;
  const facade = new HPuppeteerFacade(AccumulatorObject);

  try {
    await facade.init();
    res = await facade.executeScenarios(scrapingSteps);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await facade.close();
    writeJSONToFile(res, "./item-results.json");
    console.log(`Process is successfully finished!`);
  }
})();
