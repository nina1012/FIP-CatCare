/* eslint-disable testing-library/prefer-screen-queries */
import { expect, test as setup } from '@playwright/test';

import { generateUser } from '../src/testing/data-generators';

setup('authenticate', async ({ page }) => {
  const user = generateUser();
  console.log(user);
  await page.goto('http://localhost:5173');

  const registerLink = page.getByRole('link', { name: 'Register' });
  await registerLink.click();
  await page.goto('http://localhost:5173/auth/register');
  await expect(
    page.getByRole('heading', { name: 'Register' }),
  ).toBeInViewport();

  // register
  await page.getByPlaceholder('Full Name').click();
  await page.getByPlaceholder('Full Name').fill(user.full_name);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(user.email);
  await page.getByTestId('password').click();
  await page.getByTestId('password').fill(user.password);
  await page.getByPlaceholder('Confirm password').click();
  await page.getByPlaceholder('Confirm password').fill(user.password);
  await page.getByRole('button', { name: 'Register' }).click();
  await page.waitForURL('http://localhost:5173/app/dashboard');

  // logout
  await page.getByRole('button', { name: 'Logout' }).click();
  await page.waitForURL('http://localhost:5173/auth/login');

  // login
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(user.email);
  await page.getByTestId('password').click();
  await page.getByTestId('password').fill(user.password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForURL('http://localhost:5173/app/dashboard');
});
