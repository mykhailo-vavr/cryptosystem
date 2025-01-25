import { TwoSquare, NextPageWithLayout } from '@/components/containers';
import { MainLayout } from '@/components/layouts';

const TwoSquarePage: NextPageWithLayout = () => <TwoSquare />;

TwoSquarePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default TwoSquarePage;
