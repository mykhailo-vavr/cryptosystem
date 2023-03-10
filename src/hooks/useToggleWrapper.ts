import { useCallback } from 'react';
import useToggle from './useToggle';

export default (): [(f: (...args: any[]) => void) => (...args: unknown[]) => void, boolean] => {
  const [state, toggle] = useToggle();

  const wrapper = useCallback(
    (f: (...fArgs: unknown[]) => void) =>
      (...args: unknown[]) => {
        try {
          toggle();
          f(...args);
          toggle();
        } catch (error) {
          toggle();
          console.error('Error in toggleWrapper');
          throw Error(String(error));
        }
      },
    [toggle],
  );

  return [wrapper, state];
};
