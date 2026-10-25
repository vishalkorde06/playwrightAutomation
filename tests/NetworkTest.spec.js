const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');  // import class
 
const loginPayload={userEmail:"vishalkorde44@gmail.com",userPassword:"Vishal@9503"}
const orderPayload={orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
const fakePayloadOrders= {data:[],message:"No Orders"};
let response;

//beforeAll ->  execute before all test cases (eg only once before all three test cases)
test.beforeAll( async()=> //=> fat operator
    {  
    const apiContext= await request.newContext();
    
    const apiutils = new APIUtils(apiContext, loginPayload);
    response = await apiutils.createOrder(orderPayload);

    }
);

//beforeEach -> execute before each test eg after test1, test2, test3
test.beforeEach(()=>{

});

test('Complete end to end flow', async({page})=>{

   
    page.addInitScript(token => {
        window.localStorage.setItem('token',token);
    }, response.token );


    const email="anshika@gmail.com";
    const productName='ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client/");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route=>
    {
        //intercepting response -- API give respose -- before respose send to browser we higack response and insert the fackresponse and that response send to browser - and browser render the frontend page
        const response=await page.request.fetch(route.request());
        let body =JSON.stringify(fakePayloadOrders);
        route.fulfill(
            {
                response,
                body,
            }
        )

    }
    )



    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    
    console.log(await page.locator(".mt-4").textContent());
   
    /*
    for(let i=0; i<await listOfOrders.count(); ++i)
    {
        const orderIdOnOrdersPage=await listOfOrders.nth(i).locator("th").textContent();
        console.log("orderIdInList:- "+orderIdOnOrdersPage)


        if(response.orderId.includes(orderIdOnOrdersPage))
        {
            await listOfOrders.nth(i).locator("button[class='btn btn-primary']").click();
            break;

        }


    }

    const thankyouText=await page.locator("p[class='tagline']").textContent();
    console.log("Thank You Text:- "+thankyouText);

    const orderIdOnOrderSummary=await page.locator("div[class='col-text -main']").textContent();
    expect(orderIdOnOrderSummary===response.orderId)
    console.log("Order id matched");

    console.log("Test completed");
    await page.pause();
*/
    

})


   