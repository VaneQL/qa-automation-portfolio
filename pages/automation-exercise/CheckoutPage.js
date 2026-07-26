/**
 * Page Object para la pantalla de checkout (/checkout) de Automation Exercise.
 * Muestra la dirección de envío/facturación tomada de los datos de la
 * cuenta, un resumen del pedido, y un campo de comentario antes de pagar.
 */
class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.deliveryAddressBlock = page.locator('#address_delivery');
    this.billingAddressBlock = page.locator('#address_invoice');
    this.orderCommentTextarea = page.locator('textarea[name="message"]');
    this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
  }

  async getDeliveryAddressText() {
    return this.deliveryAddressBlock.innerText();
  }

  async getBillingAddressText() {
    return this.billingAddressBlock.innerText();
  }

  async enterOrderComment(text) {
    await this.orderCommentTextarea.fill(text);
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }
}

module.exports = { CheckoutPage };
