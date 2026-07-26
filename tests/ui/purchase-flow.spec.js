const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');

test.describe('Flujo de compra completo', () => {
  test('un usuario valido completa una compra de punta a punta', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

       await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);

       await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    expect(await inventoryPage.getCartCount()).toBe(2);

       await inventoryPage.goToCart();
    await checkoutPage.startCheckout();
    await checkoutPage.fillPersonalInfo('Vane', 'Quintana', '1000');

       await expect(checkoutPage.summaryTotalLabel).toBeVisible();

       await checkoutPage.finishOrder();

       const confirmation = await checkoutPage.getConfirmationText();
    expect(confirmation).toBe('Thank you for your order!');
  });

              test('chequeo de API post-compra (patron ilustrativo con Restful-Booker)', async ({ request }) => {
                const baseUrl = 'https://restful-booker.herokuapp.com';

                   const order = {
                     firstname: 'Vane',
                     lastname: 'Quintana',
                     totalprice: 149,
                     depositpaid: true,
                     bookingdates: { checkin: '2026-08-01', checkout: '2026-08-05' },
                     additionalneeds: 'Sauce Labs Backpack + Sauce Labs Bike Light',
                   };

                   const createResponse = await request.post(`${baseUrl}/booking`, { data: order });
                expect(createResponse.status()).toBe(200);

                   const created = await createResponse.json();
                expect(created.bookingid).toBeTruthy();

                   const getResponse = await request.get(`${baseUrl}/booking/${created.bookingid}`);
                expect(getResponse.status()).toBe(200);

                   const persisted = await getResponse.json();
                expect(persisted.firstname).toBe(order.firstname);
                expect(persisted.totalprice).toBe(order.totalprice);
              });
});
