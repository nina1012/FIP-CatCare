import { RegisterCatForm } from '@/features/cat/components/register-cat-form';

export const NewCatRoute = () => {
  return (
    <div className="container">
      <h2 className="text-2xl font-bold capitalize">New cat registration</h2>
      <div>
        <RegisterCatForm />
      </div>
    </div>
  );
};
