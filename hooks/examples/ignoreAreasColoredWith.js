/*
You can exclude the pixels that match the specified color on a baseline image from the comparison view. This feature will ignore that specific regions with the color pixels and shows the comparison view.

You can specify the following capability in the following format:

*/
let startTest=require("./helper");

module.exports= async function boundingBoxesTest(capabilities,credentials){
 
    const color = {
        r: 242,
        g: 201,
        b: 76,
        a: 1
      };

    capabilities["smartUI.options"]=  {
        "ignoreAreasColoredWith" : color // Your bounding box configuration
    }  

    var gridUrl = "https://" + credentials.username + ":" + credentials.key + credentials.gridHost;
    
     console.log("Running test for Bounding Boxes ");
     startTest(gridUrl, capabilities, "Test 1");
}