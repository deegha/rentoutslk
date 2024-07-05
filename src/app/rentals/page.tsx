import {
  Header,
  YouCanRent,
  Footer,
  RentalParameters,
  RentalCategories,
  ApartmentsRental,
} from '@/components';

export default function Home() {
  return (
    <>
      {/* HEADER section - NAV Bar */}
      <Header />

      <main>
        <RentalParameters />
        <RentalCategories />
        <ApartmentsRental />
        <YouCanRent />
      </main>

      <Footer />
    </>
  );
}
