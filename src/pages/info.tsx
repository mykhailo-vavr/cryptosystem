import { MainLayout } from '@/components/layouts';
import { NextPageWithLayout, Info } from '@/components/containers';

const InfoPage: NextPageWithLayout = () => <Info />;

InfoPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default InfoPage;
