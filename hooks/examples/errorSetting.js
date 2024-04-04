/**************************************************************************************************
 *                          Demo For Test Setting Option - ErrorType and Error Color
 * 
 * While we specify the test settings in capabilities under 'SMARTUI.OPTIONS' we specify the type of error 
 * and what color to display that color in.
 * 
 * Example :  
            let capabilities = {
            ...
                "smartUI.options": {
                "output": {
                    "errorColor": {   // This color is to specify the color the mismatched pixels.
                    "red": 200,
                    "green": 0,
                    "blue": 255
                    },
                    "errorType": "movement",  // This specify the type of error. It can have two values 'MOVEMENT' or 'FLAT'.
                    ...
                },
                ...
                }
            ...
            }
 

 *                                             How to run this test
    * First go to your Smart Ui project and create a new project.(eg name="errorTest")
    * Next, Update value of "smartUI.project": "errorTest".
    * Then, Run the test by using command 'node errorSetting.js' on line 70 . This will run your first build and create the first screenshot
      which will be BASELINE Screenshot by default.

    * To run the comparison test you need to Update the value of 'waitTime=4' on line 38.  
***************************************************************************************************/
let startTest=require("./helper");
module.exports= async function errorTest(capabilities,credentials){

    capabilities["smartUI.options"]={
      "output": {
        "errorColor": {   // Let's specify the error Color in it.
          "red": 255,
          "green": 0,
          "blue": 0 
        },
        "errorType": "movement",  // For this test we'll have the 'ERROR_TYPE' to be 'MOVEMENT'.
      }
    };   
    var gridUrl = "https://" + credentials.username + ":" + credentials.key + credentials.gridHost;
    console.log("Running tests ");
    startTest(gridUrl, capabilities, "Test 1");
    
}
