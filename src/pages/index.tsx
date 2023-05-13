import { MainLayout } from '@/components/layouts';
import { Landing, NextPageWithLayout } from '@/components/containers';

const LandingPage: NextPageWithLayout = () => <Landing />;

LandingPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default LandingPage;
