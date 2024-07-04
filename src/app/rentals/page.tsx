import {
  Header,
  YouCanRent,
  Footer,
  RentalParameters,
  RentalCategories,
} from '@/components';

export default function Home() {
  return (
    <>
      {/* HEADER section - NAV Bar */}
      <Header />

      <main>
        <RentalParameters />
        <RentalCategories />
        <YouCanRent />
      </main>

      <Footer />
    </>
  );
}
