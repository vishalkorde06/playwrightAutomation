const { test, expect } = require('@playwright/test');


test('Security test request intercept', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");

    const email = 'vishalkorde44@gmail.com';
    const productName = 'ZARA COAT 3';
    const products = await page.locator(".card-body");
    const userName = await page.locator("input#userEmail");
    const password = await page.locator("input#userPassword");
    const loginButton = await page.locator("input#login");


    await userName.fill("vishalkorde44@gmail.com");
    await password.fill("Vishal@9503");
    await loginButton.click();

    //wait until all endpoint called in network tab
    await page.waitForLoadState('networkidle');  // if this not work below method will check
    //await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);


    const count = await products.count()

    for (let i = 0; i < count; ++i) {

        if (await products.nth(i).locator("b").textContent() === productName) {
            //add to cart logic
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div[class=cart] ul").first().waitFor();
    const bool = page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("li[class=totalRow] button[type='button']").click();

    await page.locator("input[placeholder='Select Country']").pressSequentially("ind", { delay: 100 });  //pressSequentially --> to type one by one
    const dropdown = page.locator(".ta-results");  //Drop down opened section
    await dropdown.waitFor();

    const optionsCount = await dropdown.locator("button").count();  // list of options in dropdown locator     await page.locator(".ta-results button") but we want only button


    for (let i = 0; i < optionsCount; i++) {
        const text = await dropdown.locator("button").nth(i).textContent();

        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }

    }

    expect(await page.locator("div[class='user__name mt-5'] label")).toHaveText(email);
    const emailPrefilled = await page.locator("div[class='user__name mt-5'] input[class='input txt text-validated ng-untouched ng-pristine ng-valid']").inputValue();
    console.log("Email is:- " + emailPrefilled);
    expect(emailPrefilled === email);


    await page.locator("button:has-text('Apply Coupon')").click();
    console.log("Apply coupon clicked");

    await page.locator("a:has-text('Place Order ')").click();

    const confirmationText = await page.locator("h1:has-text(' Thankyou for the order. ')").textContent();
    console.log("Confirmation text:- " + confirmationText);

    const orderId = await page.locator("td[class='em-spacer-1'] label[class='ng-star-inserted']").textContent();
    console.log("Order_Id:- " + orderId);

    const array = orderId.split(" ");
    const orderId1 = array[2];

    console.log("orderId1:-" + orderId1);

    await page.locator("td[class='em-spacer-1'] label[routerlink='/dashboard/myorders']").click();
/*
    await page.locator("tbody").waitFor();
    const listOfOrders = await page.locator("tbody tr");

    for (let i = 0; i < await listOfOrders.count(); ++i) {
        const orderIdOnOrdersPage = await listOfOrders.nth(i).locator("th").textContent();
        console.log("orderIdInList:- " + orderIdOnOrdersPage)


        if (orderId1.includes(orderIdOnOrdersPage)) {
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
    */




    //login and reach orders page
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64ceb0487244490f9597ef94'})
    )
    await page.locator("button:has-text('View')").first().click();

    //await page.pause();



})