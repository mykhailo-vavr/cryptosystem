import MainLayout from '@/components/layouts/MainLayout';
import { NextPageWithLayout } from '@/pages/_app';
import Info from '@/components/containers/Info';

const Page: NextPageWithLayout = () => <Info />;

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
