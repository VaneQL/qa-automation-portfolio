/**
 * Page Object para la pantalla "ENTER ACCOUNT INFORMATION" que aparece
 * después de arrancar el signup (nombre + email) en Automation Exercise.
 * También cubre las pantallas de confirmación "ACCOUNT CREATED!" y
 * "ACCOUNT DELETED!", que comparten la misma estructura (título + texto + botón Continue).
 */
class AccountInfoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.titleMrRadio = page.locator('#id_gender1');
    this.titleMrsRadio = page.locator('#id_gender2');
    this.passwordInput = page.locator('[data-qa="password"]');
    this.daysSelect = page.locator('[data-qa="days"]');
    this.monthsSelect = page.locator('[data-qa="months"]');
    this.yearsSelect = page.locator('[data-qa="years"]');
    this.firstNameInput = page.locator('[data-qa="first_name"]');
    this.lastNameInput = page.locator('[data-qa="last_name"]');
    this.companyInput = page.locator('[data-qa="company"]');
    this.address1Input = page.locator('[data-qa="address"]');
    this.address2Input = page.locator('[data-qa="address2"]');
    this.countrySelect = page.locator('[data-qa="country"]');
    this.stateInput = page.locator('[data-qa="state"]');
    this.cityInput = page.locator('[data-qa="city"]');
    this.zipcodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('[data-qa="create-account"]');

    this.accountCreatedHeading = page.getByText('ACCOUNT CREATED!');
    this.accountDeletedHeading = page.getByText('ACCOUNT DELETED!');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  /**
   * Completa todo el formulario de datos de cuenta. Recibe un objeto
   * para no tener que pasar 15 parámetros sueltos.
   */
  async fill(details) {
    if (details.title === 'Mrs') {
      await this.titleMrsRadio.check();
    } else {
      await this.titleMrRadio.check();
    }

    await this.passwordInput.fill(details.password);
    await this.daysSelect.selectOption(details.birthDay);
    await this.monthsSelect.selectOption(details.birthMonth);
    await this.yearsSelect.selectOption(details.birthYear);
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.companyInput.fill(details.company);
    await this.address1Input.fill(details.address1);
    await this.stateInput.fill(details.state);
    await this.cityInput.fill(details.city);
    await this.zipcodeInput.fill(details.zipcode);
    await this.mobileNumberInput.fill(details.mobileNumber);
  }

  async submit() {
    await this.createAccountButton.click();
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}

module.exports = { AccountInfoPage };
