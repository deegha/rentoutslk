import {
  Header,
  Footer,
  LookingForProperty,
  TrendingProperties,
  AboutProperty,
  PropertyDetails,
  PropertyFixedBlock,
  RentalCategories,
} from '@/components';

export default function Property() {
  return (
    <>
      {/* HEADER section - NAV Bar */}
      <Header />

      <main>
        <RentalCategories
          categories={[
            'Rentals',
            'Rentals',
            'Colombo',
            'Apartment',
            'Rent 3 bedroom apartment in Sunny Neighbourhood of 65 m2 in Colombo',
          ]}
        />
        <PropertyDetails />
        <AboutProperty />
        <TrendingProperties />
        <LookingForProperty />
        <PropertyFixedBlock />
      </main>

      <Footer />
    </>
  );
}
