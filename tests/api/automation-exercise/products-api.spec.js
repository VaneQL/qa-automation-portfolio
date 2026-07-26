const { test, expect } = require('@playwright/test');
const { BASE_URL } = require('../../utils/automationExerciseAccount');

/**
 * Suite: API de catalogo (Automation Exercise)
 * https://automationexercise.com/api_list
 *
 * Cubre los escenarios documentados oficialmente por el propio sitio
 * para productsList, brandsList y searchProduct, positivos y negativos.
 */
test.describe('Catalogo API', () => {
  test('GET productsList devuelve 200 y una lista de productos', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/productsList`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('POST productsList no esta soportado (405)', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/productsList`);
    const body = await response.json();
    expect(body.responseCode).toBe(405);
  });

  test('GET brandsList devuelve 200 y una lista de marcas', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/brandsList`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.brands)).toBe(true);
    expect(body.brands.length).toBeGreaterThan(0);
  });

  test('PUT brandsList no esta soportado (405)', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/api/brandsList`);
    const body = await response.json();
    expect(body.responseCode).toBe(405);
  });

  test('POST searchProduct con parametro valido devuelve productos relacionados', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/searchProduct`, {
      form: { search_product: 'top' },
    });
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('POST searchProduct sin parametro devuelve 400', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/searchProduct`);
    const body = await response.json();
    expect(body.responseCode).toBe(400);
  });
});
