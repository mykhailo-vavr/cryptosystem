import { FC } from 'react';
import { Props } from './types';
import { Wrapper } from './styles';

const MainLayout: FC<Props> = ({ children }) => <Wrapper>{children}</Wrapper>;

export default MainLayout;
