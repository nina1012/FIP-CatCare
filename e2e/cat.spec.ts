/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';

test('should redirect to login if user is not authenticated', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/app/cat/cat-id-123');
  // user is not authenticated
  await expect(page).toHaveURL('http://localhost:5173/auth/login');
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});

test('should render cat details page when user is authenticated', async ({
  page,
}) => {
  await page.route('*/**/app/user', async (route) => {
    const json = [{ name: 'Test User', id: 'test-id' }];
    await route.fulfill({ json });
  });
  await page.goto('http://localhost:5173/app/cat/cat-id-123');
  expect(page.url()).toEqual('http://localhost:5173/app/cat/cat-id-123');
});
