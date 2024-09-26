/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

test.describe('Landing page', () => {
  test('should have correct metadata and elements', async ({ page }) => {
    await expect(page).toHaveTitle('FIP CatCare');
    await expect(page.getByText(/Landing route/i)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  });

  test('should redirect to /auth/register when register link gets clicked', async ({
    page,
  }) => {
    const registerLink = page.getByRole('link', { name: 'Register' });
    await registerLink.click();
    await page.goto('http://localhost:5173/auth/register');
  });

  test('should redirect to /auth/login when login link gets clicked', async ({
    page,
  }) => {
    const registerLink = page.getByRole('link', { name: 'Login' });
    await registerLink.click();
    await page.goto('http://localhost:5173/auth/login');
  });
});
