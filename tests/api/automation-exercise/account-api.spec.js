const { test, expect } = require('@playwright/test');
const { BASE_URL, buildAccountPayload } = require('../../utils/automationExerciseAccount');

/**
 * Suite: API de cuentas (Automation Exercise)
 * https://automationexercise.com/api_list
 *
 * Ciclo de vida completo: crear -> verificar login -> consultar por
 * email -> borrar -> confirmar que ya no existe. Corre en serial porque
 * cada paso depende del anterior (mismo patron que
 * tests/api/booking-api.spec.js del proyecto de SauceDemo).
 */
test.describe.serial('Cuentas API', () => {
  const account = buildAccountPayload();

  test('crear cuenta devuelve 201', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/createAccount`, { form: account });
    const body = await response.json();
    expect(body.responseCode).toBe(201);
    expect(body.message).toBe('User created!');
  });

  test('verificar login con credenciales validas devuelve 200', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/verifyLogin`, {
      form: { email: account.email, password: account.password },
    });
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User exists!');
  });

  test('verificar login con credenciales invalidas devuelve 404', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/verifyLogin`, {
      form: { email: account.email, password: 'contrasena-incorrecta' },
    });
    const body = await response.json();
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe('User not found!');
  });

  test('verificar login sin email devuelve 400', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/verifyLogin`, {
      form: { password: account.password },
    });
    const body = await response.json();
    expect(body.responseCode).toBe(400);
  });

  test('obtener detalle de usuario por email devuelve los datos creados', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/getUserDetailByEmail`, {
      params: { email: account.email },
    });
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.user.email).toBe(account.email);
    expect(body.user.first_name).toBe(account.firstname);
    expect(body.user.city).toBe(account.city);
  });

  test('borrar cuenta devuelve 200', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/api/deleteAccount`, {
      form: { email: account.email, password: account.password },
    });
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('Account deleted!');
  });

  test('despues de borrada, verificar login vuelve a dar 404', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/verifyLogin`, {
      form: { email: account.email, password: account.password },
    });
    const body = await response.json();
    expect(body.responseCode).toBe(404);
  });
});
