import { http, HttpResponse } from 'msw';

type RegisterCredentials = {
  fullName: string;
  email: string;
  password: string;
  role: string;
};

export const handlers = [
  // Mock for user registration

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
];
