import { NextPageWithLayout, Trithemius } from '@/components/containers';
import { MainLayout } from '@/components/layouts';

const TrithemiusPage: NextPageWithLayout = () => <Trithemius />;

TrithemiusPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default TrithemiusPage;
