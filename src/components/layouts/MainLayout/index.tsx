import { FC } from 'react';
import { MainLayoutProps } from './types';
import { MainLayoutWrapper } from './styles';

const MainLayout: FC<MainLayoutProps> = ({ children }) => <MainLayoutWrapper>{children}</MainLayoutWrapper>;

export default MainLayout;
