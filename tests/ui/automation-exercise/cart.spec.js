const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../../../pages/automation-exercise/ProductsPage');
const { CartPage } = require('../../../pages/automation-exercise/CartPage');

/**
 * Suite: Catalogo y carrito en Automation Exercise
 * No requieren estar logueado, asi que corren mas rapido y sin
 * depender de crear/borrar cuentas.
 */
test.describe('Catalogo y carrito', () => {
  test('agregar dos productos muestra precio y total correctos por item', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.goto();
    await productsPage.addProductToCartById(1); // Blue Top - Rs. 500
    await productsPage.continueShopping();
    await productsPage.addProductToCartById(2); // Men Tshirt - Rs. 400
    await productsPage.goToCartFromModal();

    await expect(cartPage.getProductRow(1)).toBeVisible();
    await expect(cartPage.getProductRow(2)).toBeVisible();
    await expect(cartPage.getTotalForProduct(1)).toHaveText('Rs. 500');
    await expect(cartPage.getTotalForProduct(2)).toHaveText('Rs. 400');
  });

  test('quitar un producto lo saca del carrito', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.goto();
    await productsPage.addProductToCartById(1);
    await productsPage.goToCartFromModal();
    await expect(cartPage.getProductRow(1)).toBeVisible();

    await cartPage.removeProduct(1);
    await expect(cartPage.getProductRow(1)).toBeHidden();
  });

  test('buscar un producto muestra resultados relacionados', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.searchProduct('dress');

    await expect(productsPage.searchedProductsHeading).toBeVisible();
    expect(await page.locator('.add-to-cart').count()).toBeGreaterThan(0);
  });

  test('el carrito pide login antes de avanzar al checkout', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.goto();
    await productsPage.addProductToCartById(1);
    await productsPage.goToCartFromModal();
    await cartPage.proceedToCheckout();

    await expect(page.getByText('Register / Login account to proceed on checkout.')).toBeVisible();
  });
});
