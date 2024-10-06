import { InstagramLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 py-6 text-white">
      <div className="mx-auto grid grid-cols-1 gap-4 px-6 md:grid-cols-3">
        <div>
          <h5 className="mb-2 text-lg font-semibold">About FIP CatCare App</h5>
          <p>
            Helping cat owners track and manage FIP treatment with ease and
            care.
          </p>
        </div>

        <div className="text-center">
          <h5 className="mb-2 text-lg font-semibold">Stay Connected</h5>
          <div className="mb-4 flex  justify-center gap-2 *:transition-colors">
            <a href="#" className="hover:text-primary">
              <LinkedInLogoIcon width={40} height={40} />
            </a>
            <a href="#" className="hover:text-primary">
              <InstagramLogoIcon width={40} height={40} />
            </a>
          </div>
        </div>

        <div>
          <h5 className="mb-2 text-lg font-semibold">Contact Us</h5>
          <p>Email: support@fipcatcare.com</p>
        </div>
      </div>
    </footer>
  );
};