import {
  Header,
  YouCanRent,
  Footer,
  RentalFilters,
  Breadcrumbs,
  ApartmentsRental,
} from '@/components';

export default function Rentals() {
  const categories = [
    { name: 'Rentouts', href: '/' },
    { name: 'Rentals', href: '/rentals' },
    { name: 'All rentals', href: '/rentals' },
  ];
  return (
    <>
      {/* HEADER section - NAV Bar */}
      <Header />

      <main>
        <RentalFilters />
        <Breadcrumbs categories={categories} />
        <ApartmentsRental />
        <YouCanRent />
      </main>

      <Footer />
    </>
  );
}
