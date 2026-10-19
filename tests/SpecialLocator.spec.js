import {test, expect} from '@playwright/test';

test.only('Playwright special locators', async({page})=>{
// Test level timeout (overall test will take 60 second to run)
    test.setTimeout(60000); 

    //Test Level assertion timeout (assertions take this time and need to apply this variable)
    const slowExpect=expect.configure({timeout:9000});  

    page.setDefaultTimeout(9000); // for actions (each action)

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByPlaceholder("Password").fill("Vishal@1234")

    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female")

    await page.getByRole("button", {name: 'Submit'}).click({timeout: 15000}); // override action level timeout

    // Step Level assertion timeout ={timeout: 10_000} = 10 sec
    await expect(page.getByText(" The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000}); 

    //await slowExpect(page.getByText(" The Form has been submitted successfully!.")).toBeVisible();  //used test level assertion timeout

    await page.getByRole("link", {name: "Shop"}).click();

    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();
    

    await page.pause();
}) 


test("Launch URL", async({page})=>{
    test.setTimeout(60000);
    const slowexpect=expect.configure({timeout:10000});

    page.setDefaultTimeout(10000);
})