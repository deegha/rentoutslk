'use client';
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import {
  RentalFilters,
  Breadcrumbs,
  ApartmentsRental,
  YouCanRent,
} from '@/components';
import { useRouter, useSearchParams } from 'next/navigation';

interface Filters {
  address: string;
  propertyType: string;
  city: string;
  maxRent: string;
  monthlyRent: number;
  minBedrooms: number;
  maxBedrooms: number;
  minBathrooms: number;
  maxBathrooms: number;
  furnishing: string;
  availableFrom: string;
  amenities: {
    parking: boolean;
    pool: boolean;
    hotWater: boolean;
    tv: boolean;
    gym: boolean;
    electricCharger: boolean;
  };
}

export default function RentalsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultFilters: Filters = {
    address: '',
    propertyType: '',
    city: '',
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
  };

  const initialFilters: Filters = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());

    return {
      address: params.address || '',
      propertyType: params.propertyType || '',
      city: params.city || '',
      maxRent: params.maxRent || '',
      monthlyRent: parseFloat(params.monthlyRent) || 0,
      minBedrooms: parseInt(params.minBedrooms) || 1,
      maxBedrooms: parseInt(params.maxBedrooms) || 8,
      minBathrooms: parseInt(params.minBathrooms) || 1,
      maxBathrooms: parseInt(params.maxBathrooms) || 8,
      furnishing: params.furnishing || '',
      availableFrom: params.availableFrom || '',
      amenities: {
        parking: params['amenities.parking'] === 'true',
        pool: params['amenities.pool'] === 'true',
        hotWater: params['amenities.hotWater'] === 'true',
        tv: params['amenities.tv'] === 'true',
        gym: params['amenities.gym'] === 'true',
        electricCharger: params['amenities.electricCharger'] === 'true',
      },
    };
  }, [searchParams]);

  const [filters, setFilters] = useState<Filters>(initialFilters);

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

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);

    const query = new URLSearchParams();

    (Object.keys(newFilters) as (keyof Filters)[]).forEach((key) => {
      const value = newFilters[key];
      const defaultValue = defaultFilters[key];

      if (typeof value === 'object' && value !== null) {
        const subObject = value;
        const defaultSubObject = defaultValue as typeof value;

        (Object.keys(subObject) as (keyof typeof subObject)[]).forEach(
          (subKey) => {
            const subValue = subObject[subKey];
            const defaultSubValue = defaultSubObject[subKey];

            if (subValue !== defaultSubValue) {
              query.set(`${key}.${subKey}`, subValue.toString());
            }
          },
        );
      } else {
        if (value !== defaultValue) {
          query.set(key, value.toString());
        }
      }
    });

    router.replace(`?${query.toString()}`);
  };

  return (
    <>
      <Suspense fallback={<div>Loading filters...</div>}>
        <RentalFilters filters={filters} onFilterChange={handleFilterChange} />
      </Suspense>
      <Breadcrumbs categories={categories} />
      <ApartmentsRental filters={filters} onFilterChange={handleFilterChange} />
      <YouCanRent />
    </>
  );
}
