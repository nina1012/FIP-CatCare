export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="relative min-h-screen w-full bg-primary py-16">
      {children}
    </div>
  );
};
