import {
  Header,
  YouCanRent,
  Footer,
  RentalParameters,
  Breadcrumbs,
  ApartmentsRental,
} from '@/components';

export default function Rentals() {
  const categories = [
    { name: 'Rentouts', href: '/' },
    { name: 'Rentals', href: '/rentals' },
    { name: 'Colombo', href: '' },
  ];
  return (
    <>
      {/* HEADER section - NAV Bar */}
      <Header />

      <main>
        <RentalParameters />
        <Breadcrumbs categories={categories} />
        <ApartmentsRental />
        <YouCanRent />
      </main>

      <Footer />
    </>
  );
}
