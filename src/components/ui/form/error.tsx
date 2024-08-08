export type ErrorProps = {
  errorMessage?: string | null;
};

export const Error = ({ errorMessage }: ErrorProps) => {
  if (!errorMessage) return null;
  return (
    <div
      role="alert"
      aria-label={errorMessage}
      className="px-3 text-xs font-semibold text-red-400"
    >
      {errorMessage}
    </div>
  );
};
