import { MainLayout } from '@/components/layouts';
import Link from 'next/link';
import { webRoutes } from '@/settings';
import { NextPageWithLayout } from '@/components/containers';

const LandingPage: NextPageWithLayout = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    }}
  >
    <h2>Welcome to Ciphers</h2>
    <Link href={webRoutes.public.CAESAR}>Caesar cipher</Link>
    <Link href={webRoutes.public.INFO}>Info</Link>
  </div>
);

LandingPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default LandingPage;
