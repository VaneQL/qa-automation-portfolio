const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');

/**
 * Suite: Checkout end-to-end
  * Cubre el flujo completo: login -> agregar producto -> carrito ->
   * datos de envio -> confirmar orden -> pantalla de exito.
    */
    test.describe('Checkout', () => {
    let inventoryPage;
    let checkoutPage;

    test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    });

    test('completar el checkout con datos validos muestra confirmacion', async ({ page }) => {
    await checkoutPage.startCheckout();
    await checkoutPage.fillPersonalInfo('Vane', 'Quintana', '1000');

    await expect(page.locator('.summary_total_label')).toBeVisible();

    await checkoutPage.finishOrder();

    const confirmation = await checkoutPage.getConfirmationText();
    expect(confirmation).toBe('Thank you for your order!');
    });

    test('intentar continuar sin postal code muestra error de validacion', async ({ page }) => {
    await checkoutPage.startCheckout();
    await checkoutPage.fillPersonalInfo('Vane', 'Quintana', '');

    await expect(checkoutPage.stepOneError).toBeVisible();
    expect(await checkoutPage.stepOneError.textContent()).toContain('Postal Code is required');
    });
    });
    
