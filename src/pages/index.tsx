import MainLayout from '@/components/layouts/MainLayout';
import Link from 'next/link';
import routes from '@/settings/routes';
import { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    }}
  >
    <h2>Welcome to Ciphers</h2>
    <Link href={routes.public.CAESAR}>Caesar cipher</Link>
    <Link href={routes.public.INFO}>Info</Link>
  </div>
);

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
