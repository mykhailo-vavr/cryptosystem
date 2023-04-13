import { FC } from 'react';
import { LinkWrapper } from './styles';
import { LinkProps } from './types';

const Link: FC<LinkProps> = (props) => <LinkWrapper {...props} />;

export default Link;
