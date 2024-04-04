const webdriver = require("selenium-webdriver");
const By = webdriver.By;
var moment = require("moment");
var waitTime = 2 // 2 seconds

// username: Username can be found at automation dashboard
const USERNAME = process.env.LT_USERNAME || "username";

// AccessKey:  AccessKey can be generated from automation dashboard or profile section
const KEY = process.env.LT_ACCESS_KEY || "accessKey";

// gridUrl: gridUrl can be found at automation dashboard
//const GRID_HOST = process.env.GRID_HOST || "@hub.sushobhit.dev.lambdatest.io/wd/hub";    //dev
const GRID_HOST =
  process.env.GRID_HOST || "@hub.lambdatest.com/wd/hub";    //connect to lambdatest hub

async function searchTextOnGoogle() {
  var keys = process.argv;
  console.log(keys);
  let parallelCount = 1;
  let platform = keys[3] || "Windows 10";
  let browserName = keys[4] || "chrome";
  let version = keys[5] || "latest";

  // Setup Input capabilities
  let capabilities = {
    platform: platform,
    browserName: browserName,
    version: version,
    queueTimeout: 300,
    visual: true,
    "user": USERNAME,
    "accessKey": KEY,
    name: "test session", // name of the test
    build: platform + browserName + version, // name of the build
    "smartUI.project": "demo",
    // will generate random smartUI build if not specified
    // "smartUI.build": "first", 
    "smartUI.options": {
      "output": {
        "errorColor": {
          "red": 200,
          "green": 0,
          "blue": 0
        },
        "errorType": "movement",
        "transparency": 1,
        "largeImageThreshold": 100,
        "useCrossOrigin": false,
        "outputDiff": true
      },
      "scaleToSameSize": true,
      "ignore": "antialiasing"
    }
  };

  // Add Resolution
  if (keys[2]) {
    capabilities.resolution = keys[2];
  }

  var gridUrl = "https://" + USERNAME + ":" + KEY + GRID_HOST;
  console.log(gridUrl);
  console.log(capabilities);
  console.log("Running " + parallelCount + " parallel tests ");
  let i = 1;
  for (i = 1; i <= parallelCount; i++) {
    startTest(gridUrl, capabilities, "Test " + i);
  }
}

searchTextOnGoogle();

async function startTest(gridUrl, capabilities, name) {
  const caps = capabilities;
  var start_date = moment();

  const driver = await new webdriver.Builder()
    .usingServer(gridUrl)
    .withCapabilities(caps)
    .build();

  var end_date = moment();
  var duration = moment.duration(end_date.diff(start_date));
  console.log(caps.name, " : Setup Time :", duration.asSeconds());

  // navigate to a url
  let url = "https://www.lambdatest.com";
  console.log(url);
  await driver
    .get(url)
    .then(function () {
      const session = driver.getSession();

      // For Smartui TakeScreenshot
      setTimeout(function () {
        console.log("taking screenshot ...")
        driver.executeScript(`smartui.takeScreenshot,{"screenshotName":"custom-resolution"}`).then(out => {
          console.log("RESPONSE :", out)
          return
        });
      }, waitTime * 1000);


      driver.getTitle().then(function (title) {
        setTimeout(function () {
          driver.executeScript("lambda-status=passed");
          driver.quit();
        }, 15000);
      });
    })
    .catch(function (err) {
      error = JSON.stringify(err);
      console.log(error);
      console.log("test failed with reason " + err);
      driver.executeScript("lambda-status=failed");
      driver.quit();
    });
}

