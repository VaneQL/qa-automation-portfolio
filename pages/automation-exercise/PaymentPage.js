/**
 * Page Object para la pantalla de pago (/payment) de Automation Exercise.
 * Es un formulario de tarjeta ficticio (no hay pasarela de pago real
 * ni se cobra nada), pensado específicamente para practicar checkouts
 * completos de punta a punta.
 */
class PaymentPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.nameOnCardInput = page.locator('[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('[data-qa="card-number"]');
    this.cvcInput = page.locator('[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('[data-qa="expiry-year"]');
    this.payButton = page.locator('[data-qa="pay-button"]');

    this.orderPlacedHeading = page.getByText('ORDER PLACED!');
    this.confirmationText = page.getByText('Congratulations! Your order has been confirmed!');
  }

  async fill(details) {
    await this.nameOnCardInput.fill(details.nameOnCard);
    await this.cardNumberInput.fill(details.cardNumber);
    await this.cvcInput.fill(details.cvc);
    await this.expiryMonthInput.fill(details.expiryMonth);
    await this.expiryYearInput.fill(details.expiryYear);
  }

  async payAndConfirm() {
    await this.payButton.click();
  }
}

module.exports = { PaymentPage };
