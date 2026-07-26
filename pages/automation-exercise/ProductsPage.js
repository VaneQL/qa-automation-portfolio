/**
 * Page Object para el catálogo de productos de Automation Exercise.
 */
class ProductsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsHeading = page.getByText('SEARCHED PRODUCTS');

    this.addedModalViewCartLink = page.getByRole('link', { name: 'View Cart' });
    this.addedModalContinueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/products');
  }

  /**
   * Agrega un producto al carrito por su id (el mismo id que devuelve
   * la API productsList, así que UI y API quedan fáciles de correlacionar).
   */
  async addProductToCartById(productId) {
    await this.page.locator(`.add-to-cart[data-product-id="${productId}"]`).click();
  }

  async continueShopping() {
    await this.addedModalContinueShoppingButton.click();
  }

  async goToCartFromModal() {
    await this.addedModalViewCartLink.click();
  }

  async searchProduct(query) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }
}

module.exports = { ProductsPage };
