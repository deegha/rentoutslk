'use client';
import {
  Header,
  Footer,
  LookingForProperty,
  TrendingProperties,
  AboutProperty,
  PropertyDetails,
  PropertyFixedBlock,
  Breadcrumbs,
  TourRequestForm,
} from '@/components';
import { useEffect, useState } from 'react';

export default function Property() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isModalOpen]);

  const categories = [
    { name: 'Rentouts', href: '/' },
    { name: 'Rentals', href: '/rentals' },
    { name: 'Colombo', href: '' },
    { name: 'Apartment', href: '' },
    {
      name: 'Rent 3 bedroom apartment in Sunny Neighbourhood of 65 m2 in Colombo',
      href: `/property/1`,
    },
  ];

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* HEADER section - NAV Bar */}
      <Header />

      <main>
        <Breadcrumbs categories={categories} />
        <PropertyDetails />
        <AboutProperty />
        <TrendingProperties />
        <LookingForProperty />
        <PropertyFixedBlock setIsModalOpen={setIsModalOpen} />
      </main>

      <Footer />

      {isModalOpen && <TourRequestForm handleCloseModal={handleCloseModal} />}
    </>
  );
}
