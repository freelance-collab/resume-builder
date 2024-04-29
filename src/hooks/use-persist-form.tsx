import { useEffect } from 'react';

export const usePersistForm = ({
  value,
  localStorageKey,
  shouldPersist,
}: {
  value: any;
  localStorageKey: string;
  shouldPersist: boolean;
}) => {
  useEffect(() => {
    if (shouldPersist) {
      localStorage.setItem(localStorageKey, JSON.stringify(value));
    }
  }, [value, localStorageKey, shouldPersist]);
};
