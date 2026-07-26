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
         *   - performance_glitch_user  -> loguea pero simula lentitud de carga
          *   - error_user               -> loguea, pero genera errores al interactuar con ciertos elementos
           *   - visual_user              -> loguea, pero tiene diferencias visuales (util para regresion visual)
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

            // --- Casos positivos: el resto de usuarios aceptados por la app ---
            // Todos deberian poder loguearse (aunque algunos tengan comportamientos
            // raros DESPUES del login, que quedan fuera del alcance de este caso).
            const validUsers = ['problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];

            for (const username of validUsers) {
            test(`el usuario "${username}" puede loguearse correctamente`, async ({ page }) => {
            // performance_glitch_user simula una carga lenta a proposito,
            // asi que le damos mas tiempo antes de dar el test por fallido.
            test.slow();

            await loginPage.login(username, 'secret_sauce');

            await expect(page).toHaveURL(/inventory.html/, { timeout: 15000 });
            await expect(page.locator('.title')).toHaveText('Products');
            });
            }

            // --- Casos negativos: usernames con formato invalido ---
            const invalidUsernames = [
            { label: 'con numeros', value: '123456' },
            { label: 'con espacios', value: 'standard user' },
            { label: 'con simbolos', value: 'standard_user!@#' },
            ];

            for (const { label, value } of invalidUsernames) {
            test(`un username ${label} no permite loguearse`, async () => {
            await loginPage.login(value, 'secret_sauce');

            await expect(loginPage.errorMessage).toBeVisible();
            expect(await loginPage.getErrorText()).toContain('do not match');
            });
            }

            // --- Copiar y pegar en los campos ---
            test('se puede pegar el usuario y la contrasena con Ctrl+V', async ({ page, context, browserName }) => {
            // La API del portapapeles del sistema operativo no esta soportada de
            // forma confiable en todos los navegadores via Playwright; la restringimos
            // a Chromium, que es donde funciona de forma estable.
            test.skip(browserName !== 'chromium', 'Clipboard API solo soportada de forma confiable en Chromium');

            await context.grantPermissions(['clipboard-read', 'clipboard-write']);

            await page.evaluate(() => navigator.clipboard.writeText('standard_user'));
            await loginPage.usernameInput.click();
            await page.keyboard.press('ControlOrMeta+V');
            await expect(loginPage.usernameInput).toHaveValue('standard_user');

            await page.evaluate(() => navigator.clipboard.writeText('secret_sauce'));
            await loginPage.passwordInput.click();
            await page.keyboard.press('ControlOrMeta+V');
            await expect(loginPage.passwordInput).toHaveValue('secret_sauce');

            await loginPage.loginButton.click();
            await expect(page).toHaveURL(/inventory.html/);
            });
            });
            
