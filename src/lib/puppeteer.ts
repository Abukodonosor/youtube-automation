import puppeteer, { Browser, Page, PuppeteerLaunchOptions } from "puppeteer";

export interface AccumulatorObj {
  // Static configuration and data for the he scraping steps (scenarios)
  CONFIG: {
    SITE_URL: string;
    [key: string]: any;
  };
  // Dynamic contextual data
  TEMP: {
    [key: string]: any;
  };
  //** WANT attribute acts like RESULT context where we prepare data for output*/
  WANT: ProductSpecification[];
}

export interface ShortSpecification {
  name: string;
  regularPrice: string;
  oldPrice: string | any;
  url: string;
}
export interface ProductSpecification {
  picture: string;
  description: string;
  availableSizes: string;
  name: string;
  regularPrice: string;
  oldPrice: string;
  url: string;
}

// Step function type
export type ScenarioFunction = (
  page: Page,
  accumulator: AccumulatorObj
) => Promise<any>;

// Scenario object structure
export interface Scenario {
  name: string;
  action: ScenarioFunction;
}

// Accumulator object
export interface Accumulator {
  [key: string]: any;
}

export class HPuppeteerFacade<T extends AccumulatorObj> {
  private browser!: Browser;
  private accumulator: T;

  constructor(accumulator: T) {
    this.accumulator = accumulator;
  }
  async init(config?: PuppeteerLaunchOptions | undefined) {
    this.browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      devtools: false,
      ignoreHTTPSErrors: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-infobars",
        "--window-size=1280,800",
        "--window-position=0,0",
        "--disable-notifications",
        "--disable-extensions",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--lang=en-US,en",
        // Mimic real browser characteristics
        "--enable-features=NetworkService,NetworkServiceInProcess",
        "--disable-features=IsolateOrigins,site-per-process",
        "--disable-blink-features=AutomationControlled",  // Hide automation
        // Add common plugins that real browsers typically have
        "--enable-plugins",
        "--enable-javascript",
        "--enable-cookies",
      ],
      defaultViewport: {
        width: 1280,
        height: 800,
        deviceScaleFactor: 1,
        hasTouch: false,
        isLandscape: true,
        isMobile: false,
      },
      ...config,
    });
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async executeScenarios(scenarios: Scenario[]) {
    try {
      const page = await this.browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      
      // Set common browser languages
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US,en;q=0.9'
      });

      for (const [_, scenario] of scenarios.entries()) {
        console.info(`Executing scenario: ${scenario.name}`);
        await scenario.action(page, this.accumulator);
      }
    } catch (error) {
      console.error("Error executing scenario:", error);
    }

    return this.accumulator;
  }
}
