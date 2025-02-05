import {
  AccumulatorObj,
  ProductSpecification,
  Scenario,
  ShortSpecification,
} from "./lib/puppeteer";
import { getUrlsWithClass, getTextWithClass, cleanString } from "./lib/helpers";

export const AccumulatorObject: AccumulatorObj = {
  CONFIG: {
    SITE_URL: "https://www.youtube.com/",

    userEmail: "cube.uros@gmail.com",
    userPassword: "wasp1993",

    channelName: "The Trilby Gents Club",
    chanelUrl: "https://www.youtube.com/@trilbygentsclub"
  },
  // Dynamic contextual data
  TEMP: {},
  // WANT context attribute for final items result
  WANT: [],
};

/**
 *
 * Inspiration was to make iterator which will loop trough the scenarios.
 * Those scenarios describe our usage of the scraper itself. (we get flexible)
 *
 * We should treat it like story, which is splitted in logical scenarios.
 * If you want to join writing the story, just add the new scenario :)
 *
 *
 *
 */

export const scrapingSteps: Scenario[] = [
  {
    name: "1. Open Youtube platform",
    action: async (page, accumulator) => {
      await page.goto(accumulator.CONFIG.SITE_URL);
    },
  },
  {
    name: "2. Click signIn to Youtube",
    action: async (page, accumulator) => {
      const signInButton = await page.waitForSelector('[aria-label="Sign in"]');
      if (signInButton) {
        // Perform a click on the element
        await signInButton.click();
        console.log("Sign-in button clicked");
      } else {
        console.log("Sign-in button not found");
      }

      await page.waitForNavigation(); // Wait 5 seconds for demo purposes
    },
  },
  {
    name: "3. Login User to Youtube",
    action: async (page, accumulator) => {
      const emailInput = await page.waitForSelector("#identifierId");
      if (emailInput) {
        await emailInput.type(accumulator.CONFIG.userEmail);

        // Use Promise.all to handle navigation after clicking
        await Promise.all([
          page.waitForNavigation(),
          page.keyboard.press("Enter"),
        ]);
      }

      // await page.waitForNavigation(); // Wait 5 seconds for demo purposes
      await new Promise( resolve => setTimeout(resolve, 3000))
      // Wait for password field and type password
      await page.type(
        'input[type="password"]',
        accumulator.CONFIG.userPassword
      );

      await Promise.all([page.keyboard.press("Enter")]);

      // await page.waitForNavigation(); // Wait 5 seconds for demo purposes
    },
  },
  {
    name: "4. Search the right youtube chanel",
    action: async (page, accumulator) => {
      // Wait for and type into the search input
      await page.waitForSelector('input[name="search_query"]');
      await page.type(
        'input[name="search_query"]',
        accumulator.CONFIG.channelName
      );
      await page.keyboard.press("Enter");

     //timeout 5 second
     await new Promise( resolve => setTimeout(resolve, 3000))
    },
  },
  {
    name: "5. Lisen specific song",
    action: async (page, accumulator) => {
      // Navigate to the specific video URL
      await page.goto('https://www.youtube.com/watch?v=THGRc-Ve0tQ');


      await new Promise( resolve => setTimeout(resolve, 3000))
      // Wait for video player to be ready and find the play button
      await page.waitForSelector('.ytp-play-button.ytp-button', { 
        visible: true,
        timeout: 5000
      });

      // Try clicking the play button using page.evaluate for more reliable interaction
      await page.evaluate(() => {
        const playButton = document.querySelector('.ytp-play-button.ytp-button');
        if (playButton instanceof HTMLElement) {
          playButton.click();
        }
      });

      // Wait for random duration between 50-70 seconds
      const waitDuration = Math.floor(Math.random() * (70000 - 50000) + 50000);
      await new Promise(resolve => setTimeout(resolve, waitDuration));

      console.log(`Listened to song for ${waitDuration/1000} seconds`);

    },
  },
  {
    name: "5. Lisen specific song",
    action: async (page, accumulator) => {
      // Navigate to the specific video URL
      await page.goto('https://www.youtube.com/watch?v=_jS6z3ae0HQ');


      await new Promise( resolve => setTimeout(resolve, 3000))
      // Wait for video player to be ready and find the play button
      await page.waitForSelector('.ytp-play-button.ytp-button', { 
        visible: true,
        timeout: 5000
      });

      // Try clicking the play button using page.evaluate for more reliable interaction
      await page.evaluate(() => {
        const playButton = document.querySelector('.ytp-play-button.ytp-button');
        if (playButton instanceof HTMLElement) {
          playButton.click();
        }
      });

      // Wait for random duration between 50-70 seconds
      const waitDuration = Math.floor(Math.random() * (70000 - 50000) + 50000);
      await new Promise(resolve => setTimeout(resolve, waitDuration));

      console.log(`Listened to song for ${waitDuration/1000} seconds`);

    },
  },
];
