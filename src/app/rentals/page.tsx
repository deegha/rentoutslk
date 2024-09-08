'use client';

import {
  Header,
  YouCanRent,
  Footer,
  RentalFilters,
  Breadcrumbs,
  ApartmentsRental,
} from '@/components';
import React, { useState, useEffect, Suspense } from 'react';
import PageTitle from '@/components/nav/pageTitle';
import { SearchProvider } from '@/context/searchProvider/searchProvider';

export default function Rentals() {
  const [filters, setFilters] = useState({
    address: '',
    propertyType: '',
    place: '',
    maxRent: '',
    monthlyRent: 0,
    minBedrooms: 1,
    maxBedrooms: 8,
    minBathrooms: 1,
    maxBathrooms: 8,
    furnishing: '',
    availableFrom: '',
    amenities: {
      parking: false,
      pool: false,
      hotWater: false,
      tv: false,
      gym: false,
      electricCharger: false,
    },
  });

  const [categories, setCategories] = useState([
    { name: 'Rentouts', href: '/' },
    { name: 'Rentals', href: '/rentals' },
  ]);

  useEffect(() => {
    setCategories([
      { name: 'Rentouts', href: '/' },
      { name: 'Rentals', href: '/rentals' },
      { name: filters.address ? filters.address : 'All rentals', href: '/' },
    ]);
  }, [filters.address]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <SearchProvider>
      <Header />
      <main>
        <PageTitle title="rentoutslk | All rentals" />
        <Suspense fallback={<div>Loading filters...</div>}>
          <RentalFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </Suspense>
        <Breadcrumbs categories={categories} />
        <ApartmentsRental
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <YouCanRent />
      </main>
      <Footer />
    </SearchProvider>
  );
}
