import MainLayout from '@/components/layouts/MainLayout';
import { NextPageWithLayout } from './_app';

const Error404Page: NextPageWithLayout = () => <div>404 page</div>;

Error404Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Error404Page;
