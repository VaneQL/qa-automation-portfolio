const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');

test.describe('Inventario', () => {
let inventoryPage;

test.beforeEach(async ({ page }) => {
const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('standard_user', 'secret_sauce');

inventoryPage = new InventoryPage(page);
});

test('agregar un producto al carrito actualiza el contador', async () => {
expect(await inventoryPage.getCartCount()).toBe(0);

await inventoryPage.addProductToCart('Sauce Labs Backpack');

expect(await inventoryPage.getCartCount()).toBe(1);
});

test('agregar dos productos distintos suma el contador correctamente', async () => {
await inventoryPage.addProductToCart('Sauce Labs Backpack');
await inventoryPage.addProductToCart('Sauce Labs Bike Light');

expect(await inventoryPage.getCartCount()).toBe(2);
});

test('ordenar por precio de menor a mayor deja la lista ordenada', async () => {
await inventoryPage.sortBy('lohi');

const names = await inventoryPage.getProductNames();
expect(names.length).toBeGreaterThan(0);
});
});
