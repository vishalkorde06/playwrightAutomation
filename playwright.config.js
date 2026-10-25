// @ts-check
const { defineConfig } = require ('@playwright/test');


const config=({
  
 testDir: './tests',
  //testMatch: 'SpecialLocator.spec.js',
  //testMatch: 'CompleteFlow.spec.js',
  //testMatch: 'UIBasicstest.spec.js',
  //testMatch: 'ClientApp.spec.js',
  //testMatch: 'MoreValidations.spec.js',
  //testMatch:'WebAPIPart1.spec.js',
 // testMatch:'WebAPIPart2.spec.js',
  //testMatch:'NetworkTest.spec.js',
  testMatch:'NetworkTest2.spec.js',

  //override default wait
  timeout:90*1000,

  //time for assertion
  expect :{
  timeout: 40*1000,
  },

  //reporting in html
  reporter : 'html',

  use: {

    actionTimeout: 10*1000,
    navigationTimeout: 60*1000,

    browserName : 'chromium',
    headless : false,
    screenshot :'on', //screenshot on each step
    trace: 'on', //trace log information
    //trace : 'retain-on-failure',
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },
 

  /* Run test in different browser
projects:[
  {
    name:'chromium',
    use:{browserName:'chromium', headless:false},
  },

  {
    name:'firefox',
    use:{browserName:'firefox', headless:false},
  },

  {
    name:'edge',
    use:{browserName:'edge', headless:false},
  },
]
  */


  
});
//export config valiable so it is available accorss your all file in your project
module.exports = config

