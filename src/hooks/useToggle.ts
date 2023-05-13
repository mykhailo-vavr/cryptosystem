import { useState, useCallback, Dispatch, SetStateAction } from 'react';

export default (initialState = false): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => setState((prevState) => !prevState), []);

  return [state, toggle, setState];
};
