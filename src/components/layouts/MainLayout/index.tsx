import { FC } from 'react';
import { MainLayoutProps } from './types';

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <>
    <h1>It is a main layout</h1>
    {children}
  </>
);

export default MainLayout;
