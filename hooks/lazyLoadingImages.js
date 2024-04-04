const { Builder, By, Key, until } = require("selenium-webdriver");

const config = require("./config.json");

const USERNAME = process.env.LT_USERNAME || "<Your_Username>";

// AccessKey:  AccessKey can be generated from automation dashboard or profile section
const KEY = process.env.LT_ACCESS_KEY || "<Your_Access_Key>";

//connect to Lambdatest hub
const GRID_HOST = process.env.GRID_HOST || "@hub.lambdatest.com/wd/hub";

const gridUrl = "https://" + USERNAME + ":" + KEY + GRID_HOST;

async function captureLazyLoadingImages() {
  let driver = await new Builder()
    .usingServer(gridUrl)
    .withCapabilities(...config)
    .build();

  try {
    await driver.get("https://isha.sadhguru.org/in/en");
    await driver.manage().setTimeouts({ implicit: 10000 }); // wait up to 10 seconds for elements to appear

    let images = await driver.findElements(By.css("img.lazyload"));

    for (let i = 0; i < images.length; i++) {
      await driver.executeScript("arguments[0].scrollIntoView();", images[i]);
      await driver.wait(until.elementIsVisible(images[i]), 10000); // wait up to 10 seconds for image to appear

      let src = await images[i].getAttribute("src");
      console.log(`Captured image source: ${src}`);
    }
    await driver.executeScript(`smartui.takeFullPageScreenshot=Testing FPS`);
  } finally {
    await driver.quit();
  }
}

captureLazyLoadingImages();
