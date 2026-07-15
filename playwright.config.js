// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Configuracion principal de Playwright.
   * Ver: https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',

    fullyParallel: true,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    reporter: [['html', { open: 'never' }], ['list']],

    use: {
screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry',
  },

  projects: [
{
name: 'chromium',
  use: { ...devices['Desktop Chrome'] },
},
    {
    name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
  },
],
                        });
