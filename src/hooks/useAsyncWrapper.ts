import { useCallback } from 'react';

export default () =>
  useCallback(
    (f: (...args: any[]) => Promise<void>) =>
      (...args: unknown[]) => {
        f(...args).catch(console.error);
      },
    [],
  );
