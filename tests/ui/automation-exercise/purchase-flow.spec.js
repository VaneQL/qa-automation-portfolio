const { test, expect } = require('@playwright/test');
const { AuthPage } = require('../../../pages/automation-exercise/AuthPage');
const { ProductsPage } = require('../../../pages/automation-exercise/ProductsPage');
const { CartPage } = require('../../../pages/automation-exercise/CartPage');
const { CheckoutPage } = require('../../../pages/automation-exercise/CheckoutPage');
const { PaymentPage } = require('../../../pages/automation-exercise/PaymentPage');
const { createTestAccount, deleteTestAccount } = require('../../utils/automationExerciseAccount');

/**
 * Suite: Flujo de compra completo (E2E) en Automation Exercise
 *
 * A diferencia del E2E de SauceDemo (donde el chequeo de API es
 * ilustrativo porque esa app no tiene backend propio), acá la compra
 * completa esta conectada de punta a punta de verdad: la cuenta que se
 * crea por API es la misma que se usa para loguearse y comprar por UI,
 * y la direccion que aparece en el checkout es la misma que se mando al
 * crear la cuenta. Es la prueba mas fuerte de que UI y API hablan con
 * el mismo backend real.
 */
test.describe('Flujo de compra completo', () => {
  test('un usuario logueado completa una compra y la direccion coincide con el registro', async ({
    page,
    request,
  }) => {
    const { payload } = await createTestAccount(request);

    const authPage = new AuthPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);

    await authPage.goto();
    await authPage.login(payload.email, payload.password);
    expect(await authPage.isLoggedInAs(payload.name)).toBe(true);

    await productsPage.goto();
    await productsPage.addProductToCartById(1);
    await productsPage.continueShopping();
    await productsPage.addProductToCartById(2);
    await productsPage.goToCartFromModal();

    await cartPage.proceedToCheckout();

    // La direccion de envio tiene que coincidir con la que se mando al crear la cuenta por API
    const deliveryAddress = await checkoutPage.getDeliveryAddressText();
    expect(deliveryAddress).toContain(payload.firstname);
    expect(deliveryAddress).toContain(payload.address1);
    expect(deliveryAddress).toContain(payload.city);

    await checkoutPage.enterOrderComment('Pedido de prueba generado por Playwright.');
    await checkoutPage.placeOrder();

    await paymentPage.fill({
      nameOnCard: `${payload.firstname} ${payload.lastname}`,
      cardNumber: '4242424242424242',
      cvc: '123',
      expiryMonth: '12',
      expiryYear: '2028',
    });
    await paymentPage.payAndConfirm();

    await expect(paymentPage.orderPlacedHeading).toBeVisible();
    await expect(paymentPage.confirmationText).toBeVisible();

    await deleteTestAccount(request, payload.email, payload.password);
  });
});
