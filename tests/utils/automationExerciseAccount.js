/**
 * Helper compartido para crear y borrar cuentas de prueba en
 * Automation Exercise vía API. Lo usan tanto los tests de UI (para
 * armar una cuenta rápido sin pasar por el formulario visual) como
 * los tests de API (para el ciclo de vida completo de una cuenta).
 *
 * Cada cuenta se genera con un email único (timestamp + numero random)
 * para que corridas en paralelo (Chromium + Firefox, varios workers)
 * nunca choquen entre si.
 */
const BASE_URL = 'https://automationexercise.com';

function buildAccountPayload(overrides = {}) {
  const unique = Date.now() + '-' + Math.floor(Math.random() * 1000000);
  return {
    name: 'Vane QA Portfolio',
    email: `vane.qa.portfolio+${unique}@example.com`,
    password: 'Portfolio123!',
    title: 'Mrs',
    birth_date: '10',
    birth_month: '5',
    birth_year: '1995',
    firstname: 'Vane',
    lastname: 'Quintana',
    company: 'QA Portfolio',
    address1: 'Calle Falsa 123',
    address2: '',
    country: 'Argentina',
    zipcode: '1000',
    state: 'Buenos Aires',
    city: 'CABA',
    mobile_number: '1122334455',
    ...overrides,
  };
}

async function createTestAccount(request, overrides = {}) {
  const payload = buildAccountPayload(overrides);
  const response = await request.post(`${BASE_URL}/api/createAccount`, { form: payload });
  const body = await response.json();
  return { payload, response, body };
}

async function deleteTestAccount(request, email, password) {
  return request.delete(`${BASE_URL}/api/deleteAccount`, { form: { email, password } });
}

module.exports = { BASE_URL, buildAccountPayload, createTestAccount, deleteTestAccount };
