import { Header, MultiStepFormApparts, Footer } from '@/components';
import PageTitle from '@/components/nav/pageTitle';

const AddYourApart = () => {
  return (
    <>
      <Header />
      <main>
        <PageTitle title="retnoutslk | List your property" />
        <MultiStepFormApparts />
      </main>
      <Footer />
    </>
  );
};

export default AddYourApart;
