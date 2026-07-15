const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

/**
 * Suite: Login
  * App bajo prueba: https://www.saucedemo.com/ (app de demo mantenida por Sauce Labs
   * especificamente para practicar automatizacion)
    *
     * Usuarios de prueba que expone la propia app (todos con password "secret_sauce"):
      *   - standard_user            -> login exitoso normal
       *   - locked_out_user          -> usuario bloqueado, debe mostrar error
        *   - problem_user             -> loguea pero tiene bugs de UI (util para casos exploratorios)
         */
         test.describe('Login', () => {
         let loginPage;

         test.beforeEach(async ({ page }) => {
         loginPage = new LoginPage(page);
         await loginPage.goto();
         });

         test('un usuario valido puede loguearse y llega al inventario', async ({ page }) => {
         await loginPage.login('standard_user', 'secret_sauce');

         await expect(page).toHaveURL(/inventory.html/);
         await expect(page.locator('.title')).toHaveText('Products');
         });

         test('un usuario bloqueado ve un mensaje de error y no entra', async ({ page }) => {
         await loginPage.login('locked_out_user', 'secret_sauce');

         await expect(page).toHaveURL('https://www.saucedemo.com/');
         await expect(loginPage.errorMessage).toBeVisible();
         expect(await loginPage.getErrorText()).toContain('locked out');
         });

         test('una contrasena incorrecta muestra el mensaje de error generico', async ({ page }) => {
         await loginPage.login('standard_user', 'password-incorrecta');

         await expect(loginPage.errorMessage).toBeVisible();
         expect(await loginPage.getErrorText()).toContain('do not match');
         });

         test('campos vacios no permiten avanzar', async ({ page }) => {
         await loginPage.loginButton.click();

         await expect(loginPage.errorMessage).toBeVisible();
         expect(await loginPage.getErrorText()).toContain('Username is required');
         });
         });
         
