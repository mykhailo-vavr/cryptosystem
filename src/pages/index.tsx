import MainLayout from '@/components/layouts/MainLayout';
import { Button } from 'antd';
import { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => (
  <>
    <h2>Welcome to NextJS starter</h2>
    <Button>Antd here!!</Button>
  </>
);

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
