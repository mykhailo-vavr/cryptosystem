import { FC } from 'react';
import { Link } from '@/components/UI/atoms';
import { webRoutes } from '@/settings';
import { LandingWrapper } from './styles';

const Landing: FC = () => (
  <LandingWrapper>
    <h2>Welcome to Ciphers</h2>
    <Link href={webRoutes.public.CAESAR}>Caesar cipher</Link>
    <Link href={webRoutes.public.TRITHEMIUS}>Trithemius cipher</Link>
    <Link href={webRoutes.public.VIGENERE}>Vigenere cipher</Link>
    <Link href={webRoutes.public.KNAPSACK}>Merkle-Hellman knapsack cryptosystem</Link>
    <Link href={webRoutes.public.RSA}>RSA</Link>
    <Link href={webRoutes.public.DIFFIE_HELLMAN}>Diffie Hellman key exchange</Link>
    <Link href={webRoutes.public.TWO_SQUARE}>Two-square (Wheatstone) cipher</Link>
    <Link href={webRoutes.public.HILL}>Hill cipher</Link>
    <Link href={webRoutes.public.INFO}>Info</Link>
  </LandingWrapper>
);

export default Landing;
