import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from '@/lib/auth';

import { AppRoot } from './app/root';

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
    {
      path: '/auth/login',
      lazy: async () => {
        const { LoginRoute } = await import('./auth/login');
        return { Component: LoginRoute };
      },
    },
    {
      path: '/auth/register',
      lazy: async () => {
        const { RegisterRoute } = await import('./auth/register');
        return { Component: RegisterRoute };
      },
    },
    {
      path: '/app',
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'dashboard',
          lazy: async () => {
            const { DashboardRoute } = await import('./app/dashboard');
            return { Component: DashboardRoute };
          },
        },
        {
          path: 'user',
          lazy: async () => {
            const { UserRoute } = await import('./app/user');
            return { Component: UserRoute };
          },
        },
        {
          path: 'dosage-calc',
          lazy: async () => {
            const { DosageCalcRoute } = await import('./app/dosage-calc');
            return { Component: DosageCalcRoute };
          },
        },
        {
          path: 'cat/:catID', // Cat details page
          lazy: async () => {
            const { CatDetailsRoute } = await import('./app/cat/[catID]');
            return { Component: CatDetailsRoute };
          },
        },
      ],
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./not-found');
        return { Component: NotFoundRoute };
      },
    },
  ]);
