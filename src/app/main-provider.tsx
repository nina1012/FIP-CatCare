import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LucideRefreshCcw } from 'lucide-react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import DevBadge from '@/components/ui/common/dev-badge';
import { Spinner } from '@/components/ui/common/spinner';
import { Toaster } from '@/components/ui/toast/toaster';
import { FIPChatBot } from '@/features/FIP-chat-bot/components/FIP-chat-bot';
import { queryClient } from '@/lib/react-query';

const ErrorFallback = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong 😕 </h2>
      <button
        className="mt-2 flex"
        onClick={() => window.location.assign(window.location.origin)}
      >
        <LucideRefreshCcw className="pr-2" />
        Refresh
      </button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense fallback={<Spinner />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {import.meta.env.DEV && <ReactQueryDevtools />}
          <DevBadge />
          <FIPChatBot />
          {children}
          <Toaster />
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
