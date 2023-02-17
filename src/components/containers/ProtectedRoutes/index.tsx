import { FC, useMemo } from 'react';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/router';
import { routes } from '@/settings/routes';
import { ProtectedRoutesProps } from './types';

const ProtectedRoutes: FC<ProtectedRoutesProps> = ({ children }) => {
  const { isAuthenticated } = useUser();
  const { push, pathname } = useRouter();

  const isPublicRoute = useMemo(() => Object.values(routes.public).includes(pathname), [pathname]);

  if (isPublicRoute) {
    return children;
  }

  if (!isAuthenticated) {
    push(routes.public.ERROR_404).catch(console.error);
    return null;
  }

  return children;
};

export default ProtectedRoutes;
