'use client';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './apartmentsRental.module.scss';
import { ApartmentsList, TagsList } from '@/components';
import BeatLoader from 'react-spinners/BeatLoader';

interface ApartmentsRentalProps {
  filters: {
    address: string;
    place: string;
    monthlyRent: number;
    propertyType: string;
    maxRent: string;
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
  };
  onFilterChange?: (_newFilters: ApartmentsRentalProps['filters']) => void;
}

interface Apartment {
  id: string;
  address: string;
  place: string;
  availableFrom: string;
  deposit: number;
  floorArea: number;
  propertyType: string;
  monthlyRent: number;
  title: string;
  image1: string;
  image2: string;
  numberBedrooms: number;
  numberBathrooms: number;
  furnishing: string;
  createdAt: string;
  views: number;
  parking?: boolean;
  pool?: boolean;
  hotWater?: boolean;
  tv?: boolean;
  gym?: boolean;
  electricCharger?: boolean;
}

export const ApartmentsRental: React.FC<ApartmentsRentalProps> = ({
  filters,
  onFilterChange,
}) => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [filteredApartments, setFilteredApartments] = useState<Apartment[]>([]);
  const [cardCount, setCardCount] = useState(8);
  const [loading, setLoading] = useState(true);

  const applyFilters = useCallback(
    (data: Apartment[]) => {
      let filteredData = data;

      if (filters.address || filters.place) {
        filteredData = filteredData.filter(
          (apartment) =>
            (filters.address &&
              apartment.address &&
              apartment.address
                .toLowerCase()
                .includes(filters.address.toLowerCase())) ||
            (filters.place &&
              apartment.place &&
              apartment.place
                .toLowerCase()
                .includes(filters.place.toLowerCase())),
        );
      }

      if (filters.propertyType && filters.propertyType !== 'all') {
        filteredData = filteredData.filter(
          (apartment) => apartment.propertyType === filters.propertyType,
        );
      }

      if (filters.maxRent) {
        const maxRentValue = parseInt(filters.maxRent, 10);
        if (!isNaN(maxRentValue)) {
          filteredData = filteredData.filter((apartment) => {
            return apartment.monthlyRent <= maxRentValue;
          });
        } else {
          console.error(`Invalid maxRent value: ${filters.maxRent}`);
        }
      }

      if (filters.minBedrooms && filters.maxBedrooms) {
        filteredData = filteredData.filter(
          (apartment) =>
            apartment.numberBedrooms >= filters.minBedrooms &&
            apartment.numberBedrooms <= filters.maxBedrooms,
        );
      }

      if (filters.minBathrooms && filters.maxBathrooms) {
        filteredData = filteredData.filter(
          (apartment) =>
            apartment.numberBathrooms >= filters.minBathrooms &&
            apartment.numberBathrooms <= filters.maxBathrooms,
        );
      }

      if (filters.furnishing === 'Yes') {
        filteredData = filteredData.filter(
          (apartment) => apartment.furnishing === 'Yes',
        );
      }

      if (filters.availableFrom) {
        filteredData = filteredData.filter(
          (apartment) =>
            new Date(apartment.availableFrom) >=
            new Date(filters.availableFrom),
        );
      }

      if (filters.amenities) {
        Object.keys(filters.amenities).forEach((key) => {
          if (filters.amenities[key as keyof typeof filters.amenities]) {
            filteredData = filteredData.filter((apartment) => {
              const amenityValue = apartment[key as keyof Apartment];
              return typeof amenityValue === 'boolean' && amenityValue === true;
            });
          }
        });
      }

      setFilteredApartments(filteredData);
    },
    [filters],
  );

  useEffect(() => {
    async function fetchRentals() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          propertyType: filters.propertyType || '',
          maxRent: filters.maxRent || '',
        });

        const response = await fetch(`/api/rentals?${queryParams}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          const apartmentsWithDefaultValues = data.map(
            (apartment: Apartment) => ({
              ...apartment,
              address: apartment.address || '',
              place: apartment.place || '',
            }),
          );
          setApartments(apartmentsWithDefaultValues);
          applyFilters(apartmentsWithDefaultValues);
        } else {
          console.error('Expected an array but received:', data);
        }
      } catch (error) {
        console.error('Error fetching rentals:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRentals();
  }, [filters, applyFilters]);

  useEffect(() => {
    applyFilters(apartments);
  }, [filters, apartments, applyFilters]);

  const handleShowMore = () => {
    setCardCount((prevCount) => prevCount + 8);
  };

  const removeFilter = (filterName: string) => {
    if (!onFilterChange) return;

    const _newFilters = { ...filters };

    switch (filterName) {
      case 'Furnished':
        _newFilters.furnishing = '';
        break;
      case 'Parking':
        _newFilters.amenities.parking = false;
        break;
      case 'Pool':
        _newFilters.amenities.pool = false;
        break;
      case 'Hot water':
        _newFilters.amenities.hotWater = false;
        break;
      case 'TV':
        _newFilters.amenities.tv = false;
        break;
      case 'Gym':
        _newFilters.amenities.gym = false;
        break;
      case 'Electric charger':
        _newFilters.amenities.electricCharger = false;
        break;
      default:
        _newFilters.propertyType = 'all';
    }

    onFilterChange(_newFilters);
  };

  const activeTags = [
    filters.propertyType !== 'all' && filters.propertyType,
    filters.furnishing && 'Furnished',
    filters.amenities.parking && 'Parking',
    filters.amenities.pool && 'Pool',
    filters.amenities.hotWater && 'Hot water',
    filters.amenities.tv && 'TV',
    filters.amenities.gym && 'Gym',
    filters.amenities.electricCharger && 'Electric charger',
  ].filter((tag): tag is string => Boolean(tag));

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.availableRents}>
          {filters.address || filters.place ? (
            <p>
              <span className={styles.availableCount}>
                {filteredApartments.length}
              </span>{' '}
              available rentals in {filters.address || filters.place}
            </p>
          ) : (
            <p>
              <span className={styles.availableCount}>
                {filteredApartments.length}
              </span>{' '}
              available rentals
            </p>
          )}
        </div>
        <TagsList tags={activeTags} onRemoveTag={removeFilter} />
        {loading ? (
          <div className={styles.loader}>
            <BeatLoader color="#DE225C" />
          </div>
        ) : (
          <ApartmentsList
            apartments={filteredApartments}
            cardCount={cardCount}
            showBestOffer={false}
            buttonText="Show more"
            buttonTextColor="#222222"
            buttonFontWeight="600"
            buttonPadding="14.5px 20px"
            buttonBorderRadius="4px"
            buttonBgColor="#f7f7f7"
            buttonBorderColor="#222222"
            onShowMore={handleShowMore}
          />
        )}
      </div>
    </section>
  );
};
