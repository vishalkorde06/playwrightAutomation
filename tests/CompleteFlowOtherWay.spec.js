const {test, expect}=require('@playwright/test');

test.only('Complete end to end flow', async({page})=>{
    
    //test.only('Complete end to end flow', async({browser})=>{
    //const context= await browser.newContext();
    //const page=await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");

    const email='anshika@gmail.com';
    const productName='ZARA COAT 3';
    const products=await page.locator(".card-body");
    const userName=await page.getByPlaceholder("email@example.com");
    const password=await page.locator("input#userPassword");
    const loginButton=await page.getByRole('button',{name: "Login"});

    
    await userName.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    await loginButton.click();

    //wait until all endpoint called in network tab
    await page.waitForLoadState('networkidle');  // if this not work below method will check
    //await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name: "Add to Cart"}).click();
    await page.getByRole("listitem").getByRole("button", {name:"Cart"}).click();

    await page.locator("div li").first().waitFor();
    await expect (page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button",{name:"Checkout"}).click();
    
    await page.getByPlaceholder




    /*
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
    */

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

    await page.locator("tbody").waitFor();
    const listOfOrders=await page.locator("tbody tr");

    for(let i=0; i<await listOfOrders.count(); ++i)
    {
        const orderIdOnOrdersPage=await listOfOrders.nth(i).locator("th").textContent();
        console.log("orderIdInList:- "+orderIdOnOrdersPage)


        if(orderId1.includes(orderIdOnOrdersPage))
        {
            await listOfOrders.nth(i).locator("button[class='btn btn-primary']").click();
            break;

        }


    }

    const thankyouText=await page.locator("p[class='tagline']").textContent();
    console.log("Thank You Text:- "+thankyouText);

    const orderIdOnOrderSummary=await page.locator("div[class='col-text -main']").textContent();
    expect(orderIdOnOrderSummary===orderId1)
    console.log("Order id matched");





    console.log("Test completed");
    await page.pause();


})