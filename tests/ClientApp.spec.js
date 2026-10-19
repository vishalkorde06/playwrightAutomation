//import anotation 
const {test, expect} = require('@playwright/test');



test.only('Browser context declaration playwright test1', async ({page})=>{
 
    await page.goto("https://rahulshettyacademy.com/client");
    
    page.locator("input#userEmail").fill("anshika@gmail.com");
    page.locator("input#userPassword").fill("Iamking@000");
    page.locator("input#login").click();

    //wait until all endpoint called in network tab
    await page.waitForLoadState('networkidle');  // if this not work below method will check
   
    //await page.locator(".card-body b").first().waitFor();

    const titles= await page.locator(".card-body b").allTextContents();
    console.log(titles);


});

