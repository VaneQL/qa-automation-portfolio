/**
 * Page Object para login/signup/logout de Automation Exercise.
 *
 * A diferencia de SauceDemo, esta app tiene un backend real: cuando
 * crea o borra una cuenta, esos cambios existen de verdad del lado
 * del servidor (se pueden confirmar por API). Por eso varios tests
 * de este proyecto combinan API (para crear/borrar cuentas rápido y
 * sin depender de la UI) con UI (para probar el login/logout en sí).
 */
class AuthPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');

    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');

    this.loggedInAsText = page.locator('a:has-text("Logged in as")');
    this.logoutLink = page.locator('a[href="/logout"]');
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/login');
  }

  async login(email, password) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async startSignup(name, email) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
  }

  async isLoggedInAs(name) {
    return this.page.locator(`a:has-text("Logged in as ${name}")`).isVisible();
  }
}

module.exports = { AuthPage };
