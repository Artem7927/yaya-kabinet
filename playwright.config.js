const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',
  retries: 0,
  reporter: 'list',
  use: {
    headless: false,
    launchOptions: {
      args: ['--no-sandbox'],
    },
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
