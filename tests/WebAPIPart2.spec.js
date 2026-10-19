const{test, expect} = require('@playwright/test');

// Login UI --> .json (collect all in json file) using storagedate method

let webContext;

test.beforeAll(async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");

    const email='anshika@gmail.com';
    const pass='Iamking@000';

    const userName=await page.locator("input#userEmail");
    const password=await page.locator("input#userPassword");
    const loginButton=await page.locator("input#login");
  
    await userName.fill(email);
    await password.fill(pass);
    await loginButton.click();

    await page.waitForLoadState('networkidle');
    //storageStage() method
    await context.storageState({path: 'state.json'});
    webContext= await browser.newContext({storageState:'state.json'});


})


test('Client app login', async()=>
{

    const email="";
    const productName='ZARA COAT 3';

    const page=await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    const products=await page.locator(".card-body");
    const titles= await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count= await products.count()

    for(let i=0; i<count; ++i)
    {
        
        if(await products.nth(i).locator("b").textContent()===productName)
        {
            //add to cart logic
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    console.log("code is here");

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div[class=cart] ul").first().waitFor();
    const bool=page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("li[class=totalRow] button[type='button']").click();

    await page.locator("input[placeholder='Select Country']").pressSequentially("ind",{delay:100});  //pressSequentially --> to type one by one
    const dropdown= page.locator(".ta-results");  //Drop down opened section
    await dropdown.waitFor();

    const optionsCount=await dropdown.locator("button").count();  // list of options in dropdown locator     await page.locator(".ta-results button") but we want only button


    for(let i=0; i<optionsCount; i++)
    {
         const text=await dropdown.locator("button").nth(i).textContent();
         
         if(text===" India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
        
    }

    expect(await page.locator("div[class='user__name mt-5'] label")).toHaveText(email);
    const emailPrefilled=await page.locator("div[class='user__name mt-5'] input[class='input txt text-validated ng-untouched ng-pristine ng-valid']").inputValue();
    console.log("Email is:- " +emailPrefilled);
    expect (emailPrefilled===email);


    await page.locator("button:has-text('Apply Coupon')").click();
    console.log("Apply coupon clicked");

    await page.locator("a:has-text('Place Order ')").click();

    const confirmationText=await page.locator("h1:has-text(' Thankyou for the order. ')").textContent();
    console.log("Confirmation text:- "+confirmationText);

    const orderId=await page.locator("td[class='em-spacer-1'] label[class='ng-star-inserted']").textContent();
    console.log("Order_Id:- "+orderId);

    const array=orderId.split(" ");
    const orderId1=array[2];

    console.log("orderId1:-"+orderId1);
    await page.locator("td[class='em-spacer-1'] label[routerlink='/dashboard/myorders']").click();



})