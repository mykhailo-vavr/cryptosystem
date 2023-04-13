import { NextPageWithLayout, Vigenere } from '@/components/containers';
import { MainLayout } from '@/components/layouts';

const VigenerePage: NextPageWithLayout = () => <Vigenere />;

VigenerePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default VigenerePage;
