import {
  Header,
  Footer,
  LookingForProperty,
  TrendingProperties,
} from '@/components';

export default function Property() {
  return (
    <>
      {/* HEADER section - NAV Bar */}
      <Header />

      <main>
        <TrendingProperties />
        <LookingForProperty />
      </main>

      <Footer />
    </>
  );
}
