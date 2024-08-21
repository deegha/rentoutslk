'use client';
import {
  Header,
  YouCanRent,
  Footer,
  RentalFilters,
  Breadcrumbs,
  ApartmentsRental,
} from '@/components';
import React, { useState, useEffect } from 'react';

export default function Rentals() {
  const [filters, setFilters] = useState({
    address: '',
    propertyType: '',
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
    { name: 'All rentals', href: '/rentals' },
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
    <>
      <Header />
      <main>
        <RentalFilters filters={filters} onFilterChange={handleFilterChange} />
        <Breadcrumbs categories={categories} />
        <ApartmentsRental
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <YouCanRent />
      </main>
      <Footer />
    </>
  );
}
