import { Footer } from '../ui/common/footer';
import { Header } from '../ui/header/header';

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="relative min-h-screen w-full bg-background py-24">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
