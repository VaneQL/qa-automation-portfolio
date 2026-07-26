const { test, expect } = require('@playwright/test');
const { AuthPage } = require('../../../pages/automation-exercise/AuthPage');
const { AccountInfoPage } = require('../../../pages/automation-exercise/AccountInfoPage');
const { createTestAccount, deleteTestAccount, buildAccountPayload } = require('../../utils/automationExerciseAccount');

/**
 * Suite: Auth (login / signup / logout) en Automation Exercise
 *
 * A diferencia de SauceDemo, acá login y signup pegan a un backend real.
 * Por eso la mayoria de estos tests arrancan creando (o no) una cuenta
 * por API antes de probar el comportamiento por UI: es mas rapido y no
 * depende de que el formulario visual de registro este disponible para
 * poder probar, por ejemplo, un login exitoso.
 *
 * Nota sobre anuncios: la app muestra anuncios intersticiales de
 * terceros (lo confirmamos explorando el sitio a mano: un anuncio llego
 * a tapar el boton "Create Account"). En el test de registro completo
 * por UI bloqueamos esos dominios con page.route antes de arrancar.
 */
test.describe('Auth', () => {
  test('un usuario nuevo puede registrarse completo desde la UI', async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|google\.com\/pagead|adservice|amazon-adsystem/, (route) =>
      route.abort()
    );

    const authPage = new AuthPage(page);
    const accountInfoPage = new AccountInfoPage(page);
    const account = buildAccountPayload();

    await authPage.goto();
    await authPage.startSignup(account.name, account.email);

    await accountInfoPage.fill({
      title: account.title,
      password: account.password,
      birthDay: account.birth_date,
      birthMonth: account.birth_month,
      birthYear: account.birth_year,
      firstName: account.firstname,
      lastName: account.lastname,
      company: account.company,
      address1: account.address1,
      state: account.state,
      city: account.city,
      zipcode: account.zipcode,
      mobileNumber: account.mobile_number,
    });
    await accountInfoPage.submit();

    await expect(accountInfoPage.accountCreatedHeading).toBeVisible();
    await accountInfoPage.clickContinue();

    expect(await authPage.isLoggedInAs(account.name)).toBe(true);

    // Cerramos el ciclo borrando la cuenta desde la misma UI
    await authPage.deleteAccount();
    await expect(accountInfoPage.accountDeletedHeading).toBeVisible();
  });

  test('login con credenciales validas', async ({ page, request }) => {
    const { payload } = await createTestAccount(request);

    const authPage = new AuthPage(page);
    await authPage.goto();
    await authPage.login(payload.email, payload.password);

    expect(await authPage.isLoggedInAs(payload.name)).toBe(true);

    await deleteTestAccount(request, payload.email, payload.password);
  });

  test('login con credenciales invalidas muestra error', async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.goto();
    await authPage.login('cuenta-que-no-existe@example.com', 'contrasenaInventada123');

    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  });

  test('logout despues de loguearse vuelve a la pantalla de login', async ({ page, request }) => {
    const { payload } = await createTestAccount(request);

    const authPage = new AuthPage(page);
    await authPage.goto();
    await authPage.login(payload.email, payload.password);
    expect(await authPage.isLoggedInAs(payload.name)).toBe(true);

    await authPage.logout();
    await expect(page.getByText('Login to your account')).toBeVisible();

    await deleteTestAccount(request, payload.email, payload.password);
  });

  test('registrarse con un email ya existente muestra error', async ({ page, request }) => {
    const { payload } = await createTestAccount(request);

    const authPage = new AuthPage(page);
    await authPage.goto();
    await authPage.startSignup('Otro Nombre', payload.email);

    await expect(page.getByText('Email Address already exist!')).toBeVisible();

    await deleteTestAccount(request, payload.email, payload.password);
  });
});
