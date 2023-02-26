# WebdriverIO-Mocha-Allure UI Automation Framework
*********************************************************
Test Automation project for Web UI Automation to verify scenarios for the applicaiton under test i.e. https://www.ebay.com
Created using Page Object Model (POM) pattern using WebdriverIO, Mocha with Chai assertion library.
Includes Allure Reporting for generating clear graphical reports 

## Assumptions  
* Assuming the chrome browser version is 109.0.0 and above
* Instructions on how to alter the framework level paramters can be found by the comments in wdio.conf.js file

## Getting Started
* Follow the Prerequisites section in this document
* Open this project folder in Visual Studio Code
* Install the dependencies with respect to this project by entering this in the terminal <npm install>

### Prerequisites
* Visual Studio Code editor
* NodeJS 16 and above
* Allure binary unzziped to a folder and the path to be set in Environment variables
* JAVA_HOME to be set

### Running the tests
To run all the tests execute the below command in the terminal,
* npm run test

To run specific test,
* npm run test -- --mochaOpts.grep "TestCaseID001"
or
* npm run test -- --mochaOpts.grep "sanity"

To Debug a test with breakpoints,
* open the package.json and click on the Debug icon above "scripts" and select "test"

To open the allure results,
* npm run report

## Built With
* WebdriverIO - To support browser actions
* Mocha - Core Test Framework
* Chai - Assertion Library
* Allure - For Detailed reporting

## Authors
* Sudeep Jayaram 
* Contact: sudeep.jayaram22@gmail.com / +91-9901134343 

## License
ISC - No License Required
