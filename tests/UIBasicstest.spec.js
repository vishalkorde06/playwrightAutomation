//import anotation 
const {test, expect} = require('@playwright/test');

//()=> anomus function -- function not have name.
/*
test('First playwright test', async ()=>{
    
});
*/

//fixture ---global variable {browser}
test('Browser context declaration playwright test', async ({browser})=>{

    //open new instance fresh browser
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://testing.jobma.com/");
    //get title --assertion

    console.log(await page.title());
    await expect (page).toHaveTitle("Jobma")

});


test('Browser context declaration playwright test1', async ({browser})=>{



    //open new instance fresh browser
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName=page.locator("input#username");
    const password=page.locator("input#password");
    const signIn=page.locator("input.btn.btn-info.btn-md");
    const cardTitle= page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //get title --assertion  

    console.log(await page.title());
    await expect (page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")

    //css  .type, .fill method for enter input
    //await page.locator("input#username").type("learning");

    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signIn.click();

console.log (await cardTitle.first().textContent());
console.log (await cardTitle.last().textContent());

console.log (await cardTitle.nth(0).textContent());  //nth(0) = first element
console.log (await cardTitle.nth(1).textContent());  //nth(1) = second element


const allTitles= await cardTitle.allTextContents();
console.log(allTitles);

    //.textContent() for get the text
    //console.log(await page.locator("[style*='block']").textContent());

    //.toContainText to comapre a text
   // await expect (page.locator("[style*='block']")).toContainText("Incorrect");


   


});


test("UI Controls", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName=page.locator("input#username");
    const password=page.locator("input#password");
    
    // handle radio button
    await page.locator(".customradio").last().click();
    await page.locator("#okayBtn").click();

    console.log(await page.locator(".customradio").last().isChecked());
    await expect(page.locator(".customradio").last()).toBeChecked();  // Assertion --> toBeChecked();   //await otside as action to be performed outside the brackat

    // Static dropdown
    const dropdown=page.locator("select.form-control");
    await dropdown.selectOption("Consultant");

    //await page.pause(); // execution pause and open playwright inspector

 
    //check box

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();

    expect(await page.locator("#terms").isChecked()).toBeFalsy();  // await inside  as action is to be perfomed inside the brackat
    console.log("check box is unchecked");

    const documentLink=page.locator("[href*='documents-request']");
    await expect(documentLink).toHaveAttribute("class","blinkingText");
})


test.only('child window handle', async ({browser})=>{

    const context =await browser.newContext(); //create new session
    const page= await context.newPage(); //open new page

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink=page.locator("[href*='documents-request']");
    const userName=page.locator("input#username");
    const password=page.locator("input#password");
    
    //Promise.all  wherever we want two method run parellelly  [An array promises]

    //  const [newPage, newPage2]= await Promise.all(  if two window will open

    const [newPage]= await Promise.all(
    [

    context.waitForEvent('page'), //waitForEvent is the method which listen the any new page open in background
    //three state of promise pending, rejected, fullfilled
    documentLink.click(),

    ])

    const text=await newPage.locator(".red").textContent();
    const arrayText=text.split("@");
    const domain= arrayText[1].split(" ")[0]

    console.log("email id is:-" +domain);

    await userName.fill(domain);
    await page.pause();


    console.log(await page.locator("#username").inputValue()); // inputValue for get entered text


})



/*
test('First playwright test', async ({page})=>{
  
    await page.goto("https://google.com/");

});
*/