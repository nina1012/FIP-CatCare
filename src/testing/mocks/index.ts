export const enableMocking = async () => {
  const isBrowser = () =>
    ![typeof window, typeof document].includes('undefined');
  if (isBrowser() && process.env.NODE_ENV === 'development') {
    const { worker } = await import('./browser');
    console.log(worker);
    // return worker.start();
  }
};
