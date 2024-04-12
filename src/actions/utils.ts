import { checkAuth } from './auth-actions';

export interface ActionRes<T> {
  data?: T;
  error?: string;
}

type AsyncFunction<TResponse, TArgs> = (args: TArgs) => Promise<TResponse>;

type AsyncFunctionWithUserId<TResponse, TArgs> = (userId: string, args: TArgs) => Promise<TResponse>;

export function asyncAuthHandler<TResponse, TArgs>(
  fn: AsyncFunctionWithUserId<TResponse, TArgs>,
): AsyncFunction<ActionRes<TResponse>, TArgs> {
  return async function (args: TArgs) {
    try {
      const session = await checkAuth();

      const data = await fn(session.user.id, args);

      return { data };
    } catch (error) {
      const err = error as Error;
      return { error: err.message };
    }
  };
}

export function promisifyAction<TResponse, TArgs>(action: AsyncFunction<ActionRes<TResponse>, TArgs>) {
  return async function (args: TArgs) {
    const data = await action(args);
    if (data.error) {
      throw new Error(data.error);
    }

    return data.data;
  };
}
