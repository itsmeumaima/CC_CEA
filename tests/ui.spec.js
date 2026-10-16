
const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://127.0.0.1:8000';

async function openHomepage(page) {
  const response = await page.goto(BASE_URL, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  expect(response).not.toBeNull();
  expect(response.status()).toBeLessThan(500);

  await expect(page.locator('body')).toBeVisible();
}

test('UI-01: Homepage loads successfully', async ({ page }) => {
  await openHomepage(page);
});

test('UI-02: Page has a title', async ({ page }) => {
  await openHomepage(page);

  await expect(page).toHaveTitle(/.+/);
});

test('UI-03: Navigation menu is visible', async ({ page }) => {
  await openHomepage(page);

  const navigation = page.locator('nav').first();
  await expect(navigation).toBeVisible();
});

test('UI-04: Brand name or logo is visible', async ({ page }) => {
  await openHomepage(page);

  const brand = page.getByText('PostSync', { exact: true }).first();
  await expect(brand).toBeVisible();
});

test('UI-05: Main heading is visible', async ({ page }) => {
  await openHomepage(page);

  await expect(page.locator('h1').first()).toBeVisible();
});
