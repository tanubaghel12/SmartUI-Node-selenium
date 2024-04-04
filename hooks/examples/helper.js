const webdriver = require("selenium-webdriver");
var moment = require("moment");
var waitTime = 4

module.exports=async function startTest(gridUrl, capabilities, name) {
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
    let url = "https://www.lambdatest.com/blog";

    await driver
        .get(url)
        .then(function () {
        // For Smartui TakeScreenshot
        setTimeout(function () {
            console.log("taking screenshot ...")
            driver.executeScript(`smartui.takeScreenshot,{"screenshotName":"web-page"}`).then(out => {
            console.log("RESPONSE :", out)
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
};
