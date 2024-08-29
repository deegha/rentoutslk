import {
  Header,
  HeroBanner,
  CreateListingBanner,
  LookingFor,
  Footer,
  ApartmentsHome,
} from '@/components';
import { SearchProvider } from '@/context/searchProvider/searchProvider';

export default function Home() {
  return (
    <SearchProvider>
      <Header />
      <main>
        <HeroBanner />
        <ApartmentsHome />
        <CreateListingBanner />
        <LookingFor />
      </main>
      <Footer />
    </SearchProvider>
  );
}
