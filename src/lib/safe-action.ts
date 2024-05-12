import { createSafeActionClient, DEFAULT_SERVER_ERROR } from 'next-safe-action';

import { checkAuth } from '@/actions/auth-actions';

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ActionError';
  }
}

export const action = createSafeActionClient({
  handleReturnedServerError: (error) => {
    if (error instanceof ActionError) {
      return error.message;
    }
    return DEFAULT_SERVER_ERROR;
  },
});

export const authAction = createSafeActionClient({
  async middleware() {
    const session = await checkAuth();

    return { userId: session.user.id };
  },
  handleReturnedServerError: (error) => {
    if (error instanceof ActionError) {
      return error.message;
    }
    return DEFAULT_SERVER_ERROR;
  },
});
