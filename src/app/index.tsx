import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';

import { AppProvider } from './main-provider';
import { createRouter } from './pages';

const AppRouter = () => {
  const router = useMemo(() => createRouter(), []);

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
