const { test, expect } = require('@playwright/test');

/**
 * Suite: API testing con Restful-Booker
  * https://restful-booker.herokuapp.com/apidoc/index.html
   *
    * Es una API publica gratuita hecha especificamente para practicar
     * automatizacion de APIs (no requiere signup ni API key). Simula el
      * backend de un sistema de reservas de hotel: login con token,
       * crear/leer/actualizar/borrar reservas.
        *
         * Nota importante: aca NO usamos un browser, usamos el "request context"
          * de Playwright, que hace llamadas HTTP directas. Por eso estos tests
           * corren mucho mas rapido que los de UI.
            */

            const BASE_URL = 'https://restful-booker.herokuapp.com';

            // .serial() fuerza que estos tests corran en orden y en el mismo worker.
            // Es necesario porque varios tests dependen del "bookingid" y el "token"
            // generados por tests anteriores (crear -> leer -> actualizar -> borrar).
            test.describe.serial('Booking API', () => {
            let createdBookingId;
            let authToken;

            test('el endpoint de salud responde correctamente', async ({ request }) => {
            const response = await request.get(`${BASE_URL}/ping`);
            expect(response.status()).toBe(201);
            });

            test('crear una reserva devuelve un id y los datos enviados', async ({ request }) => {
            const newBooking = {
            firstname: 'Vanesa',
            lastname: 'Quintana',
            totalprice: 150,
            depositpaid: true,
            bookingdates: {
            checkin: '2026-08-01',
            checkout: '2026-08-05',
            },
            additionalneeds: 'Breakfast',
            };

            const response = await request.post(`${BASE_URL}/booking`, {
            data: newBooking,
            });

            expect(response.status()).toBe(200);

            const body = await response.json();
            expect(body).toHaveProperty('bookingid');
            expect(body.booking.firstname).toBe(newBooking.firstname);
            expect(body.booking.totalprice).toBe(newBooking.totalprice);

            createdBookingId = body.bookingid;
            });

            test('se puede obtener la reserva recien creada por id', async ({ request }) => {
            test.skip(!createdBookingId, 'Depende del test anterior, que crea la reserva');

            const response = await request.get(`${BASE_URL}/booking/${createdBookingId}`);

            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body.lastname).toBe('Quintana');
            });

            test('autenticarse devuelve un token valido', async ({ request }) => {
            const response = await request.post(`${BASE_URL}/auth`, {
            data: { username: 'admin', password: 'password123' },
            });

            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body.token).toBeTruthy();

            authToken = body.token;
            });

            test('actualizar una reserva requiere autenticacion y refleja los cambios', async ({ request }) => {
            test.skip(!createdBookingId || !authToken, 'Depende de los tests anteriores');

            const response = await request.put(`${BASE_URL}/booking/${createdBookingId}`, {
            headers: { Cookie: `token=${authToken}` },
            data: {
            firstname: 'Vanesa',
            lastname: 'Quintana Actualizada',
            totalprice: 200,
            depositpaid: false,
            bookingdates: { checkin: '2026-08-01', checkout: '2026-08-06' },
            additionalneeds: 'Late checkout',
            },
            });

            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body.lastname).toBe('Quintana Actualizada');
            expect(body.totalprice).toBe(200);
            });

            test('borrar una reserva sin token responde 403 (no autorizado)', async ({ request }) => {
            test.skip(!createdBookingId, 'Depende del test que crea la reserva');

            const response = await request.delete(`${BASE_URL}/booking/${createdBookingId}`);

            expect(response.status()).toBe(403);
            });

            test('borrar una reserva con token valido la elimina', async ({ request }) => {
            test.skip(!createdBookingId || !authToken, 'Depende de los tests anteriores');

            const response = await request.delete(`${BASE_URL}/booking/${createdBookingId}`, {
            headers: { Cookie: `token=${authToken}` },
            });

            expect(response.status()).toBe(201);

            const getAfterDelete = await request.get(`${BASE_URL}/booking/${createdBookingId}`);
            expect(getAfterDelete.status()).toBe(404);
            });
            });
            
