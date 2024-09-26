import React, { forwardRef } from 'react';

type CardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, children, className = '', onClick }, ref) => {
    const clickableClass = onClick ? 'cursor-pointer' : '';

    return (
      <div
        ref={ref}
        className={`size-full rounded-md p-4 shadow-md transition-all hover:shadow-sm hover:ring-1 ${clickableClass} ${className}`}
        onClick={onClick}
        aria-hidden="true"
      >
        <div className="grid gap-2">
          <h4 className="text-left font-bold">{title}</h4>
          {children}
        </div>
      </div>
    );
  },
);

Card.displayName = 'Card';
