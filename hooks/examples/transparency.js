/**************************************************************************************************
 *                          Demo For Test Setting Option - Transparency
 * 
 * While we specify the test settings in capabilities under 'SMARTUI.OPTIONS' we can spacify the Traparency of the comparison
 * Screenshots so that the error color can be spotted more easily.
 * 
 * Example :  
            let capabilities = {
            ...
                "smartUI.options": {
                "output": {
                     "transparency": 0.3,  // This specify the opacity of the comparison screenshot.
                    ...
                },
                ...
                }
            ...
            }
 
 *                                             How to run this test
    * First go to your Smart Ui project and create a new project.(eg name="transparencyTest")
    * Next, Update value of "smartUI.project": "tranparencyTest".
    * Then, Run the test by using command 'node transparency.js' on line 74 . This will run your first build and create the first screenshot
      which will be BASELINE Screenshot by default.

    * To run the comparison test you need to Update the value of 'waitTime=4' on line 32.  
***************************************************************************************************/
let startTest=require("./helper");

module.exports= async function transparencyTest(capabilities,credentials){
   
    capabilities["smartUI.options"]= {
      "output": {
        "transparency": 0.5,  // This specify the opacity.
      }
    };   
    var gridUrl = "https://" + credentials.username + ":" + credentials.key + credentials.gridHost;
    console.log("Running tests ");
    startTest(gridUrl, capabilities, "Test 1");
    
}