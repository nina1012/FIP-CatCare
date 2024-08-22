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
          path: 'cat/:catID', // Cat details page
          lazy: async () => {
            const { CatDetailsRoute } = await import('./app/cat/[catID]');
            return { Component: CatDetailsRoute };
          },
        },
        {
          path: 'cat/:catID/edit', // Cat details edit page
          lazy: async () => {
            const { EditCatRoute } = await import('./app/cat/[catID]/edit');
            return { Component: EditCatRoute };
          },
        },
        {
          path: 'cat/new', // Add new cat page
          lazy: async () => {
            const { NewCatRoute } = await import('./app/cat/new');
            return { Component: NewCatRoute };
          },
        },
      ],
    },
  ]);
