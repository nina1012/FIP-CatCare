import { MemoryRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';

import { appRender, userEvent, screen, waitFor } from '@/testing/test-utils';

import { RegisterForm } from '../components/register-form';

test('should register a new user and display notification with right text', async () => {
  const onSuccess = vi.fn();
  const newUser = {
    fullName: 'user',
    email: 'demo@user.com',
    password: 'password',
    avatar:
      'https://static.vecteezy.com/system/resources/previews/002/002/257/large_2x/beautiful-woman-avatar-character-icon-free-vector.jpg',
  };
  appRender(
    <MemoryRouter>
      <RegisterForm onSuccess={onSuccess} />
    </MemoryRouter>,
  );

  await userEvent.type(screen.getByTestId('fullName'), newUser.fullName);
  await userEvent.type(screen.getByTestId('email'), newUser.email);
  await userEvent.type(screen.getByTestId('password'), newUser.password);
  await userEvent.type(screen.getByTestId('avatar'), newUser.avatar);
  await userEvent.type(
    screen.getByPlaceholderText('Confirm password'),
    newUser.password,
  );

  await userEvent.click(screen.getByRole('button', { name: /register/i }));
  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() =>
    expect(
      screen.getByRole('status', {
        name: 'You have successfully registered to FIP CatCare app 🐈',
      }),
    ).toHaveBeenCalled(),
  );
});
