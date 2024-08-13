import { http, HttpResponse } from 'msw';

type RegisterCredentials = {
  fullName: string;
  email: string;
  password: string;
  role: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};

export const authHandlers = [
  // user registration mock
  http.post('http://localhost:5173/auth/register', async ({ request }) => {
    const { email, password, fullName } =
      (await request.json()) as RegisterCredentials;
    if (email && password && fullName) {
      console.log(request);
      return HttpResponse.json(
        { ...request.body, role: 'authenticated' },
        { status: 201 },
      );
    } else {
      return HttpResponse.json(
        { message: 'Invalid credentials, try again' },
        { status: 401 },
      );
    }
  }),
  // user login mock
  http.post('http://localhost:5173/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as LoginCredentials;

    if (!email || !password) {
      return HttpResponse.json(
        { message: 'Provide both email and password, try again' },
        { status: 401 },
      );
    }
    return HttpResponse.json({ user: request.body }, { status: 201 });
  }),
];
