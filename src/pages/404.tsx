import { NextPageWithLayout } from '@/components/containers';
import { MainLayout } from '@/components/layouts';

const Error404Page: NextPageWithLayout = () => <div>404 page</div>;

Error404Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Error404Page;
