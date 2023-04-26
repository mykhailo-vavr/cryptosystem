import { RSA, NextPageWithLayout } from '@/components/containers';
import { MainLayout } from '@/components/layouts';

const KnapsackPage: NextPageWithLayout = () => <RSA />;

KnapsackPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default KnapsackPage;
