import { createBrowserRouter } from 'react-router-dom';

export const createRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { LandingRoute } = await import('./landing');
        return {
          Component: LandingRoute,
        };
      },
    },
  ]);
