import { FieldError } from 'react-hook-form';

import { Error } from './error';
import { Label } from './label';

export type FieldWrapperProps = {
  label?: string;
  error?: FieldError | null;
  children: React.ReactNode;
  className?: string;
};

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, error, children } = props;
  return (
    <div className="w-full space-y-1">
      <Label>
        {label}
        <div className="mt-1">{children}</div>
      </Label>
      <Error errorMessage={error?.message} />
    </div>
  );
};
