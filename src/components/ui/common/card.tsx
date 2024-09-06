type CardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Card = ({ title, children, className = '', onClick }: CardProps) => {
  const clickableClass = onClick ? 'cursor-pointer' : '';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role={onClick ? 'button' : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      onClick={onClick}
      className={`size-full rounded-md p-4 shadow-md transition-all hover:shadow-sm hover:ring-1 ${clickableClass} ${className}`}
    >
      <div className="grid h-full gap-2">
        <h4 className="text-left font-bold">{title}</h4>
        {children}
      </div>
    </div>
  );
};

export default Card;
