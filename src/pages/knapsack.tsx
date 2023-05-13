import { Knapsack, NextPageWithLayout } from '@/components/containers';
import { MainLayout } from '@/components/layouts';

const KnapsackPage: NextPageWithLayout = () => <Knapsack />;

KnapsackPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default KnapsackPage;
