const puppeteer = require("puppeteer");

async function scrapeRealtorsByCity(city) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  function delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  // Go to realtor.com/'city of choice'.
  await page.goto(`https://www.realtor.com/realestateagents/${city}`);

  console.log("Made it to Page");
  await delay(2000);

  // Identify and iterate through email buttons and forms.
  const sendEmails = async () => {
  for (let i = 0; i < 20; i++) {
    const buttons = await page.$$(".agent-email .eOJwqh");
    await delay(2000);
    await buttons[i].click();
    await page.waitForSelector("#name");
    await page.locator("#name").fill("L3trs");
    await page.locator("#email").fill("info@L3trs.com");
    await page.locator("#comment").fill("Check out l3trs.com");
    await page.locator("svg").click();
    await delay(2000);
  }


  // Avoid bot detection
  await delay(2000);
  // After for loop is finished click 'Next' for next page.
  await page.locator(".next-link").click();
  }

  // Repeat.
  sendEmails();
}
// Run the scraper for specific city.
scrapeRealtorsByCity(`dallas_tx`);
