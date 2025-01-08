const puppeteer = require("puppeteer");

async function scrapeRealtorsByCity(city) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  function delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  console.log("hey");
  // Go to realtor.com/'city of choice'
  await page.goto(`https://www.realtor.com/realestateagents/${city}`);

  console.log("Made it to Page");
  // Click Email Realtor Button
  await delay(4000);

  await page.$$eval(".eOJwqh", (buttons) => {
    for (const button of buttons) {
      if (button.textContent === "Email") {
        button.click();
        break; // Clicking the first matching button and exiting the loop
      }
    }
  });

  console.log("button clicked");

  await page.locator("#name").fill("L3trs");
  await page.locator("#email").fill("info@L3trs.com");
  await page.locator("#comment").fill("Check out l3trs.com");

  await page.$eval(".recaptcha-checkbox-border").click();
  console.log("captcha solved");
  
  await delay(3000);

  const emailData = await page.evaluate(() => {
    const data = [];
    const title = document.querySelector(".p.GLfFQ").innerHTML.trim();

    console.log("extracted data");

    data.push({ title });

    console.log(data);

    return data;
  });
}

// Run the scraper for specific city.
scrapeRealtorsByCity(`windermere_fl`);
