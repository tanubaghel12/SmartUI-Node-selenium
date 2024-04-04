module.exports= function helpLogger() {

    console.log("Invalid Command, please enter one of the commands from below\n")
    const commands = {
            "npm start": "Run all Smart UI functionalities",
            "npm start general": "To run General test",
            "npm start error": "To run Error Setting Test",
            "npm start transparency": "To run Transparency Test",
            "npm start boundingBoxes": "To run Bounding Box test",
            "npm start ignoredBoxes": "To run Ignored Box Test",
            "npm start ignoreAreasColoredWith": "To run a Ignore Areas Colored Test2",
    };
    console.table(commands);
    process.exit(1);
}