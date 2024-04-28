import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';

const AppSessionProvider = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export { AppSessionProvider as SessionProvider };
