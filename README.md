# WebdriverIO-Mocha-Allure UI Automation Framework
*********************************************************
Test Automation project for Web UI Automation to verify scenarios for the applicaiton under test i.e. https://www.ebay.com
Created using Page Object Model (POM) pattern using WebdriverIO, Mocha with Chai assertion library.
Includes Allure Reporting for generating clear graphical reports 

## Getting Started
* Open this project folder in Visual Studio Code
* Install the dependencies with respect to this project by <npm install>

### Prerequisites
* Visual Studio Code editor software
* NodeJS

### Running the tests
To run all the tests execute the below command in the terminal,
* <npm run test>

To run specific test,
* <npm run test -- --mochaOpts.grep "TestCaseID001">
or
* <npm run test -- --mochaOpts.grep "sanity">

To Debug a test with breakpoints,
* open the package.json and click on the Debug icon above "scripts" and select "test"

To open the allure results,
* <npm run report>

## Built With
* WebdriverIO - To support browser actions
* Mocha - Core Test Framework
* Chai - Assertion Library
* Allure - For Detailed reporting

## Versioning
As per the coding test guidelines this project folder is maintained in local repository using git.

## Authors
* Sudeep Jayaram 
* Contact: sudeep.jayaram22@gmail.com / +91 - 9901134343 

## License
ISC - No License Required