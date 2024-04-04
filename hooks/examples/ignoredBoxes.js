/**************************************************************************************************
 *                          Demo For Test Setting Option - Ignored Boxes
 * 
 * While we specify the test settings in capabilities under 'SMARTUI.OPTIONS' we specify the type of error 
 * and what color to display that color in.
 * 
 * Example :  
            let capabilities = {
            ...
                "smartUI.options": {
                ...
                     ignoredBox: box,
                ...
                }
            ...
            }
 

 *                                             How to run this test
    * First go to your Smart Ui project and create a new project.(eg name="ignoredBoxesTest")
    * Next, Update value of "smartUI.project": "ignoredBoxesTest".
    * Then, Run the test by using command 'node ignoredBoxes.js' on line 70 . This will run your first build and create the first screenshot
      which will be BASELINE Screenshot by default.

    * To run the comparison test you need to Update the value of 'waitTime=4' on line 38.  
***************************************************************************************************/
let startTest=require("./helper");

module.exports= async function ignoredBoxesTest(capabilities,credentials){
  
     // Define the cordinates of the boxes.
     const box1={
      left: 700,
      top: 200,
      right: 200,
      bottom: 600
  }

  const box2={
      left: 700,
      top: 500,
      right: 200,
      bottom: 300
  }

  capabilities["smartUI.options"]=  {
    "ignoredBox" : [box1,box2],  // Here we can provide a single box or an array of boxes.
  }  
  
  var gridUrl = "https://" + credentials.username + ":" + credentials.key + credentials.gridHost;
   
  console.log("Running test for Ignored Boxes ");
  startTest(gridUrl, capabilities, "Test 1");
  
}
