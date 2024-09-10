import { MemoryRouter } from 'react-router-dom';
import { beforeEach, expect, test, vi } from 'vitest';

import { appRender, screen, userEvent, waitFor } from '@/testing/test-utils';

import { LoginForm } from '../components/login-form';

beforeEach(() => {
  vi.resetAllMocks();
});

test('should login new user and display notification with welcome text', async () => {
  const newUser = { email: 'demo@user.com', password: 'password' };
  const onSuccess = vi.fn();
  appRender(
    <MemoryRouter>
      <LoginForm onSuccess={onSuccess} />
    </MemoryRouter>,
  );

  const emailInput = screen.getByTestId(/email/i);
  const passwordInput = screen.getByTestId(/password/i);
  const loginButton = screen.getByRole('button', { name: /log in/i });

  await userEvent.type(emailInput, newUser.email);
  await userEvent.type(passwordInput, newUser.password);

  await userEvent.click(loginButton);

  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() => {
    expect(
      screen.getByRole('status', { name: /welcome back/i }),
    ).toBeInTheDocument();
  });
});
