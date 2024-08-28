import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { Select } from './select'; // Adjust the import path as needed

interface CustomSelectProps extends React.ComponentProps<typeof Select> {
  registration?: UseFormRegisterReturn;
}

const CustomSelect = React.forwardRef<HTMLDivElement, CustomSelectProps>(
  ({ registration, children, ...props }, ref) => {
    return (
      <Select
        {...props}
        onValueChange={(value) => {
          if (registration?.onChange) {
            registration.onChange({
              target: { value, name: registration.name },
            } as React.ChangeEvent<HTMLInputElement>);
          }
        }}
      >
        <div className="text-popover-foreground" ref={ref}>
          {children}
        </div>
      </Select>
    );
  },
);

CustomSelect.displayName = 'CustomSelect';

export default CustomSelect;
