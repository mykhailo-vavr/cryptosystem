import { ComponentProps } from 'react';
import Link from 'next/link';
import { LinkWrapper } from './styles';

export type LinkProps = ComponentProps<typeof Link> & ComponentProps<typeof LinkWrapper>;
