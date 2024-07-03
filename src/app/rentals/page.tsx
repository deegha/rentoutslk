import { Header, YouCanRent, Footer, RentalParameters } from '@/components';

export default function Home() {
  return (
    <>
      {/* HEADER section - NAV Bar */}
      <Header />

      <main>
        <RentalParameters />
        <YouCanRent />
      </main>

      <Footer />
    </>
  );
}
