import { Link } from 'react-router-dom';

export const LandingRoute = () => {
  return (
    <div className="min-h-screen bg-[#f1f1f1]">
      <h1>Landing Route</h1>
      <p>This route is available to everyone</p>
      <p>
        This page will contain info about what FIP is and how to successfully
        treat it.
      </p>
      <div>
        <img src="/public/cute-pink-cat.avif" alt="cat" />
      </div>
      <div className="flex gap-4 text-primary underline">
        <Link to="/auth/register">Register</Link>
        <Link to="/auth/login">Login</Link>
      </div>
    </div>
  );
};
