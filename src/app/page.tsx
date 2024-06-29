import {
  Header,
  HeroBanner,
  CreateListingBanner,
  LookingFor,
  Footer,
  ApartmentsHome,
} from '@/components';

export default function Home() {
  return (
    <>
      {/* HEADER section - NAV Bar */}
      <Header />

      <main>
        <HeroBanner />
        <ApartmentsHome />
        <CreateListingBanner />
        <LookingFor />
      </main>

      <Footer />
    </>
  );
}
