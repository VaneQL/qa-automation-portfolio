/**
 * Page Object para el carrito de Automation Exercise.
 */
class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.proceedToCheckoutButton = page.locator('.check_out');
    this.registerLoginLink = page.getByRole('link', { name: 'Register / Login' });
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/view_cart');
  }

  getProductRow(productId) {
    return this.page.locator(`#product-${productId}`);
  }

  getTotalForProduct(productId) {
    return this.getProductRow(productId).locator('.cart_total_price');
  }

  async removeProduct(productId) {
    await this.getProductRow(productId).locator('.cart_quantity_delete').click();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  /**
   * Cuando el usuario no está logueado, "Proceed To Checkout" muestra un
   * modal que obliga a registrarse/loguearse en vez de ir directo a checkout.
   */
  async goToRegisterLoginFromModal() {
    await this.registerLoginLink.click();
  }
}

module.exports = { CartPage };
