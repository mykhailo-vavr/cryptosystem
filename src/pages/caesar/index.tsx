import MainLayout from '@/components/layouts/MainLayout';
import { NextPageWithLayout } from '@/pages/_app';
import Caesar from '@/components/containers/Caesar';

const Page: NextPageWithLayout = () => <Caesar />;

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
