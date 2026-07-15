/**
 * Page Object para la pantalla de productos (inventory) de SauceDemo.
  */
  class InventoryPage {
  /**
  * @param {import('@playwright/test').Page} page
  */
  constructor(page) {
  this.page = page;

  this.pageTitle = page.locator('.title');
  this.inventoryItems = page.locator('.inventory_item');
  this.cartBadge = page.locator('.shopping_cart_badge');
  this.cartLink = page.locator('.shopping_cart_link');
  this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async addProductToCart(productName) {
  const item = this.page.locator('.inventory_item', { hasText: productName });
  await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async goToCart() {
  await this.cartLink.click();
  }

  async getCartCount() {
  const count = await this.cartBadge.count();
  return count === 0 ? 0 : Number(await this.cartBadge.textContent());
  }

  async sortBy(optionValue) {
  await this.sortDropdown.selectOption(optionValue);
  }

  async getProductNames() {
  return this.page.locator('.inventory_item_name').allTextContents();
  }
  }

  module.exports = { InventoryPage };
  
