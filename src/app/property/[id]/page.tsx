import {
  Header,
  Footer,
  LookingForProperty,
  TrendingProperties,
  AboutProperty,
  PropertyDetails,
} from '@/components';

export default function Property() {
  return (
    <>
      {/* HEADER section - NAV Bar */}
      <Header />

      <main>
        <PropertyDetails />
        <AboutProperty />
        <TrendingProperties />
        <LookingForProperty />
      </main>

      <Footer />
    </>
  );
}
