const webdriver = require("selenium-webdriver");
var moment = require("moment");
var waitTime = 4
let startTest=require("./helper");

module.exports= async function generalTest(capabilities,credentials){
    var gridUrl = "https://" + credentials.username + ":" + credentials.key + credentials.gridHost;
    console.log("Running tests ");
    startTest(gridUrl, capabilities, "Test 1");
}