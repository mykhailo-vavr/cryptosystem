import { useUserContext } from '@/context/user/useUserContext';
import { useMemo } from 'react';

export const useUser = () => {
  const { state } = useUserContext();

  return useMemo(() => ({ ...state, isAuthenticated: !!state }), [state]);
};
