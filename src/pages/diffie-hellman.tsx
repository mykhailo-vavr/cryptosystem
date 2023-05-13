import { DiffieHellman, NextPageWithLayout } from '@/components/containers';
import { MainLayout } from '@/components/layouts';

const KnapsackPage: NextPageWithLayout = () => <DiffieHellman />;

KnapsackPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default KnapsackPage;
