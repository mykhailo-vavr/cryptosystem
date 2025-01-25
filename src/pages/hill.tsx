import { Hill, NextPageWithLayout } from '@/components/containers';
import { MainLayout } from '@/components/layouts';

const HillPage: NextPageWithLayout = () => <Hill />;

HillPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default HillPage;
