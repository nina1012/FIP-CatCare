import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { Spinner } from '@/components/ui/common/spinner';
import { CareReminderWatcher } from '@/features/care-reminders/components/care-reminder-watcher';

export const AppRoot = () => {
  const location = useLocation();
  return (
    <DashboardLayout>
      <CareReminderWatcher />
      <Suspense
        fallback={
          <div className="flex size-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <ErrorBoundary
          key={location.pathname}
          fallback={<div>Something went wrong!</div>}
        >
          <Outlet />
        </ErrorBoundary>
      </Suspense>
    </DashboardLayout>
  );
};
