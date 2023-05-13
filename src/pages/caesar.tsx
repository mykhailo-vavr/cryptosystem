import { Caesar, NextPageWithLayout } from '@/components/containers';
import { MainLayout } from '@/components/layouts';

const CaesarPage: NextPageWithLayout = () => <Caesar />;

CaesarPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default CaesarPage;
