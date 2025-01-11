const puppeteer = require("puppeteer");

async function scrapeRealtorsByCity(city) {
  const scraperApiKey = "b626e3978eaedb5ed5dc76c563b66a8c";
  const url = `https://www.realtor.com/realestateagents/${city}`;
  const browser = await puppeteer.launch({
    headless: false, 
    args: [
      `--proxy-server=http://api.scraperapi.com?api_key=${scraperApiKey}&url=${encodeURIComponent(
        url
      )}`, 
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
  });
  //const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  function delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  // Go to realtor.com/'city of choice'.
  await page.goto(`https://www.realtor.com/realestateagents/${city}`);

  console.log("Made it to Page");
  

  // Identify and iterate through email buttons and forms.

  for (let i = 0; i < 20; i++) {
    const buttons = await page.$$(".agent-email .eOJwqh");
    await buttons[i].click();
    await page.waitForSelector("#name");
    await page.locator("#name").fill("L3trs");
    await page.locator("#email").fill("info@L3trs.com");
    await page.locator("#comment").fill("Check out l3trs.com");
    await page.locator("svg").click();

    // Avoid bot detection

    // After for loop is finished click 'Next' for next page.
    //await page.goto(`https://www.realtor.com/realestateagents/${city}/pg-2`)
  }

  await browser.close();
  await delay(30000);
  scrapeRealtorsByCity(`orlando_fl`);
}
// Run the scraper for specific city.
scrapeRealtorsByCity(`dallas_tx`);
