/**
 * Page Object que cubre todo el flujo de checkout de SauceDemo:
  * carrito -> datos del comprador -> resumen -> confirmacion.
   */
   class CheckoutPage {
   /**
   * @param {import('@playwright/test').Page} page
   */
   constructor(page) {
   this.page = page;

   this.checkoutButton = page.locator('[data-test="checkout"]');

   this.firstNameInput = page.locator('#first-name');
   this.lastNameInput = page.locator('#last-name');
   this.postalCodeInput = page.locator('#postal-code');
   this.continueButton = page.locator('#continue');
   this.stepOneError = page.locator('[data-test="error"]');

   this.finishButton = page.locator('#finish');
   this.summaryTotalLabel = page.locator('.summary_total_label');

   this.completeHeader = page.locator('.complete-header');
   }

   async startCheckout() {
   await this.checkoutButton.click();
   }

   async fillPersonalInfo(firstName, lastName, postalCode) {
   await this.firstNameInput.fill(firstName);
   await this.lastNameInput.fill(lastName);
   await this.postalCodeInput.fill(postalCode);
   await this.continueButton.click();
   }

   async finishOrder() {
   await this.finishButton.click();
   }

   async getConfirmationText() {
   return this.completeHeader.textContent();
   }
   }

   module.exports = { CheckoutPage };
   
