/**
 * Page Object para la pantalla de login de SauceDemo.
  *
   * El patron "Page Object Model" (POM) separa DOS cosas que en tests
    * sin estructura suelen quedar mezcladas:
     *   1. COMO se interactua con la pagina (selectores, clicks, inputs)
      *   2. QUE se esta verificando (las aserciones, que viven en el .spec.js)
       *
        * Ventaja practica: si manana cambia un selector en la app real,
         * solo hay que tocar este archivo, no los 20 tests que usan login.
          */
          class LoginPage {
          /**
          * @param {import('@playwright/test').Page} page
          */
          constructor(page) {
          this.page = page;

          this.usernameInput = page.locator('#user-name');
          this.passwordInput = page.locator('#password');
          this.loginButton = page.locator('#login-button');
          this.errorMessage = page.locator('[data-test="error"]');
          }

          async goto() {
          await this.page.goto('https://www.saucedemo.com/');
          }

          async login(username, password) {
          await this.usernameInput.fill(username);
          await this.passwordInput.fill(password);
          await this.loginButton.click();
          }

          async getErrorText() {
          return this.errorMessage.textContent();
          }
          }

          module.exports = { LoginPage };
          
