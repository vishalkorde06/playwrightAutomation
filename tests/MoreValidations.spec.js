const {test, expect}= require('@playwright/test')

test("Popup validations", async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    page.setDefaultTimeout(10000);
    /*
    await page.goto("https://google.com");
    await page.gocBack();
    await page.goForward();
    */

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();


    //how to handle pop up alert
    page.on('dialog', dialog=> dialog.accept());
    await page.locator("#confirmbtn").click();

    //How to hover
    await page.locator("#mousehover").hover();

    //how to handle iframe in playwright
    const framPage=page.frameLocator("#courses-iframe");
    await framPage.locator("li a[href*=lifetime-access][class='new-navbar-highlighter']").click();

    const textCheck = await framPage.locator("div[class='text'] h2").textContent();
    console.log(textCheck);

    const s1=textCheck.split(" ");
    const count=s1[1];
    console.log(count);
    

})