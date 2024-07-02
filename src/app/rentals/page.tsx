import { Header, YouCanRent, Footer } from '@/components';

export default function Home() {
  return (
    <>
      {/* HEADER section - NAV Bar */}
      <Header />

      <main>
        <YouCanRent />
      </main>

      <Footer />
    </>
  );
}
