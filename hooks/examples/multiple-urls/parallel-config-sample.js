const webdriver = require("selenium-webdriver");
const automationConfig = require("./parallel-config.json");
const smartUITests = require("./urls.json");

// USERNAME: Username can be found at automation dashboard
const USERNAME = process.env.LT_USERNAME || "<Your_Username>";

// KEY:  AccessKey can be generated from automation dashboard or profile section
const KEY = process.env.LT_ACCESS_KEY || "<Your_Access_key>";

//connect to Lambdatest hub
const GRID_HOST = process.env.GRID_HOST || "@hub.lambdatest.com/wd/hub";

const gridUrl = "https://" + USERNAME + ":" + KEY + GRID_HOST;

// Selenium WebDriver Function

async function runSmartUIonLambdatest() {
  // Lambdatest Cloud Selenium Grid Connection

  // Printing the Lambdatest Cloud Information for the test

  console.log("Please visit https://smartui.lambdatest.com to see your SmartUI - Visual Regression Tests");
  const smartuiBuild = "smartui-build-"+ (Math.random() + 1).toString(36).substring(7);
  console.log("smartuiBuild", smartuiBuild);
  try {
    automationConfig.forEach(async (config) => {
      console.log("########################")
      config["smartUI.build"] = smartuiBuild
      console.log(config)
      const driver = await new webdriver.Builder()
        .usingServer(gridUrl)
        .withCapabilities(config)
        .build();
      try {
        smartUITests.forEach((smartUITest) => {
          console.log("Opening URL ")
          console.log(smartUITest)
          let smartUI_ScreenshotName = smartUITest.screenshotName;
          let smartUI_url = smartUITest.url;
          smartUISeleniumTest(driver, smartUI_url, smartUI_ScreenshotName);
        });
      } catch (err) {
        console.log(err);
      }
      // Closing the Browser Session
      await driver.executeScript("lambda-status=passed");
      await driver.quit();
    });
  } catch (err) {
    console.log(JSON.stringify(err));
    await driver.executeScript("lambda-status=failed");
  }
}

async function smartUISeleniumTest(driver, url, screenshotName) {
  await driver
    .get(url)
    .then(() => {
      // For Smartui TakeScreenshot
      console.log(`Capturing the Screenshot Name:  ${screenshotName} | URL: ${url}`);
      driver
        .executeScript(`smartui.takeScreenshot=${screenshotName}`)
        .then((result) => {
          console.log("Result :", result);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

// Executing the tests in parallel of multiple urls
runSmartUIonLambdatest();
