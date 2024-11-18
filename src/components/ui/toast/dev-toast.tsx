import { useEffect } from 'react';

import { toast } from './use-toast';

export const DevToast = () => {
  useEffect(() => {
    const hasSeenToast = localStorage.getItem('dev-toast-has-been-seen');
    if (!hasSeenToast) {
      toast({
        title: '👩‍💻 Developer Account Available',
        description: (
          <>
            <p>Explore the app with our demo account:</p>
            <p>
              <strong>Username:</strong> <code>demo@example.com</code>
              <br />
              <strong>Password:</strong> <code>password123</code>
              <div>
                <a
                  className="text-primary underline"
                  href="/auth/login"
                  onClick={() =>
                    localStorage.setItem('dev-toast-has-been-seen', 'true')
                  }
                >
                  Log in page
                </a>
              </div>
            </p>
          </>
        ),
      });
    }
  }, []);

  return null;
};
