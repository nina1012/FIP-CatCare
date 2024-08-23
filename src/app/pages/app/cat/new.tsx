import { useNavigate, useSearchParams } from 'react-router-dom';

import { RegisterCatForm } from '@/features/cat/components/register-cat-form';

export const NewCatRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get('redirectTo');
  return (
    <div className="container">
      <h2 className="text-2xl font-bold capitalize">New cat registration</h2>
      <div>
        <RegisterCatForm
          onSuccess={() =>
            navigate(`${redirectTo ? `${redirectTo}` : '/app/dashboard'}`, {
              replace: true,
            })
          }
        />
      </div>
    </div>
  );
};
