'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import styles from './rentalFilters.module.scss';
import { Button, CustomInput, CustomSelect, RangeSlider } from '@/components';
import { AmenitiesItem } from '../listYourProperty/forms/addYourApart/amenitiesItem';
import { DateSelect } from '../listYourProperty/forms/addYourApart/dateSelect';

import Parking from '@/icons/parking.svg';
import Pool from '@/icons/pool.svg';
import HotWater from '@/icons/bath.svg';
import Tv from '@/icons/tv.svg';
import Gym from '@/icons/gym.svg';
import Electric from '@/icons/electric.svg';
import Filter from '@/icons/filter.svg';

const propertyType = [
  { label: 'All', value: 'all' },
  { label: 'Apartments', value: 'Apartment' },
  { label: 'Studios', value: 'Studio' },
  { label: 'Houses', value: 'House' },
];

interface RentalFiltersProps {
  filters: any;
  onFilterChange: (_newFilters: any) => void;
  _removeFilter?: (_filterName: string) => void;
}

export const RentalFilters: React.FC<RentalFiltersProps> = ({
  filters,
  onFilterChange,
  _removeFilter,
}) => {
  const searchParams = useSearchParams();
  const addressQuery = searchParams.get('address') || '';

  const [mobileFilters, setMobileFilters] = useState(false);
  const [extraFilters, setExtraFilters] = useState(false);
  const [tempBedrooms, setTempBedrooms] = useState({
    min: filters.minBedrooms || 1,
    max: filters.maxBedrooms || 8,
  });

  const [tempBathrooms, setTempBathrooms] = useState({
    min: filters.minBathrooms || 1,
    max: filters.maxBathrooms || 8,
  });

  const [tempAvailableFrom, setTempAvailableFrom] = useState<
    string | undefined
  >(filters.availableFrom || '');

  const methods = useForm({
    defaultValues: {
      ...filters,
      address: addressQuery,
    },
  });

  useEffect(() => {
    if (mobileFilters) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [mobileFilters]);

  // Эффект для автоматического запуска поиска при наличии address
  useEffect(() => {
    if (addressQuery) {
      methods.handleSubmit(handleSubmit)();
    }
  }, [addressQuery]);

  const handleSubmit = (data: any) => {
    const adjustedFilters = {
      ...data,
      furnishing: data.furnishing ? 'Yes' : '',
      minBedrooms: tempBedrooms.min,
      maxBedrooms: tempBedrooms.max,
      minBathrooms: tempBathrooms.min,
      maxBathrooms: tempBathrooms.max,
      availableFrom: tempAvailableFrom,
    };
    onFilterChange(adjustedFilters);
    setMobileFilters(false);
  };

  const handleBedroomsChange = (min: number, max: number) => {
    setTempBedrooms({ min, max });
  };

  const handleBathroomsChange = (min: number, max: number) => {
    setTempBathrooms({ min, max });
  };

  const handleDateChange = (date: string) => {
    setTempAvailableFrom(date);
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.form}
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <div className={styles.desktopContainer}>
          <div className={styles.filtersBlock}>
            <div className={styles.inputsBlock}>
              <CustomInput
                control={methods.control}
                errors={methods.formState.errors}
                label="Location"
                name="address"
                placeholder="|City, neighbourhood"
              />
              <CustomSelect
                control={methods.control}
                option={propertyType}
                errors={methods.formState.errors}
                label="Type"
                name="propertyType"
                isDefaultOption
              />
              <CustomInput
                control={methods.control}
                errors={methods.formState.errors}
                label="Max. rent"
                name="maxRent"
                placeholder="|Max rent"
              />
              <RangeSlider
                label="Number of bedrooms"
                minValue={tempBedrooms.min}
                maxValue={tempBedrooms.max}
                onChange={handleBedroomsChange}
              />
            </div>
            <div className={styles.filterBtnBlock}>
              <Button
                type="submit"
                text="Search"
                textColor="#FFFFFF"
                bgColor="#222"
                padding="14.5px 28px"
                fontWeight="600"
              />
              <Button
                text="Extra filters"
                textColor="#222"
                bgColor="#ffffff"
                borderColor="#222"
                padding="14.5px 28px"
                fontWeight="600"
                onClick={() => setExtraFilters((prev) => !prev)}
              />
            </div>
          </div>
          <div className={styles.showOnly}>
            <label className={styles.checkboxContainer}>
              <span className={styles.checkboxLabel}>Show only furnished</span>
              <input
                type="checkbox"
                className={styles.checkbox}
                {...methods.register('furnishing')}
              />
            </label>
          </div>
          {extraFilters && (
            <div className={styles.extraFiltersBlock}>
              <div className={styles.extraFiltersRow}>
                <RangeSlider
                  label="Number of bathrooms"
                  minValue={tempBathrooms.min}
                  maxValue={tempBathrooms.max}
                  onChange={handleBathroomsChange}
                />
                <div className={styles.amenitiesList}>
                  <AmenitiesItem
                    image={<Parking />}
                    title="Parking"
                    name="amenities.parking"
                    control={methods.control}
                  />
                  <AmenitiesItem
                    image={<Pool />}
                    title="Pool"
                    name="amenities.pool"
                    control={methods.control}
                  />
                  <AmenitiesItem
                    image={<HotWater />}
                    title="Hot water"
                    name="amenities.hotWater"
                    control={methods.control}
                  />
                  <AmenitiesItem
                    image={<Tv />}
                    title="TV"
                    name="amenities.tv"
                    control={methods.control}
                  />
                  <AmenitiesItem
                    image={<Gym />}
                    title="Gym"
                    name="amenities.gym"
                    control={methods.control}
                  />
                  <AmenitiesItem
                    image={<Electric />}
                    title="Electric charger"
                    name="amenities.electricCharger"
                    control={methods.control}
                  />
                </div>
              </div>
              <div className={styles.dateSelectBlock}>
                <DateSelect
                  name="availableFrom"
                  onDateChange={handleDateChange}
                  label="Moving in from"
                  fontWeight="600"
                />
              </div>
            </div>
          )}
        </div>
        <div className={styles.mobileContainer}>
          <div className={styles.mobileBtnContainer}>
            <Button
              text="Filter"
              textColor="#FFFFFF"
              bgColor="#222"
              padding="14.5px 28px"
              fontWeight="600"
              image={<Filter />}
              onClick={() => setMobileFilters((prev) => !prev)}
            />
          </div>
          {mobileFilters && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <div className={styles.mobileFiltersBlock}>
                  <div className={styles.mobileCloseBtn}>
                    <Button
                      text="Hide filter"
                      textColor="#222"
                      bgColor="#ffffff"
                      borderColor="#222"
                      padding="4px 11px"
                      fontWeight="400"
                      onClick={() => setMobileFilters((prev) => !prev)}
                    />
                  </div>
                  <div className={styles.mobileBasicFilters}>
                    <CustomInput
                      control={methods.control}
                      errors={methods.formState.errors}
                      label="Location"
                      name="address"
                      placeholder="|City, neighbourhood"
                    />
                    <CustomSelect
                      control={methods.control}
                      option={propertyType}
                      errors={methods.formState.errors}
                      label="Type"
                      name="propertyType"
                      isDefaultOption
                    />
                    <CustomInput
                      control={methods.control}
                      errors={methods.formState.errors}
                      label="Max. rent"
                      name="maxRent"
                      placeholder="|Max rent"
                    />
                    <label className={styles.checkboxContainer}>
                      <span className={styles.checkboxLabel}>
                        Show only furnished
                      </span>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        {...methods.register('furnishing')}
                      />
                    </label>
                    <RangeSlider
                      label="Number of bedrooms"
                      minValue={tempBedrooms.min}
                      maxValue={tempBedrooms.max}
                      onChange={handleBedroomsChange}
                    />
                  </div>
                  {extraFilters && (
                    <div className={styles.mobileExtraFilters}>
                      <RangeSlider
                        label="Number of bathrooms"
                        minValue={tempBathrooms.min}
                        maxValue={tempBathrooms.max}
                        onChange={handleBathroomsChange}
                      />
                      <div className={styles.dateSelectBlock}>
                        <DateSelect
                          name="availableFrom"
                          onDateChange={handleDateChange}
                          label="Moving in from"
                          fontWeight="600"
                        />
                      </div>
                      <div className={styles.amenitiesList}>
                        <AmenitiesItem
                          image={<Parking />}
                          title="Parking"
                          name="amenities.parking"
                          control={methods.control}
                        />
                        <AmenitiesItem
                          image={<Pool />}
                          title="Pool"
                          name="amenities.pool"
                          control={methods.control}
                        />
                        <AmenitiesItem
                          image={<HotWater />}
                          title="Hot water"
                          name="amenities.hotWater"
                          control={methods.control}
                        />
                        <AmenitiesItem
                          image={<Tv />}
                          title="TV"
                          name="amenities.tv"
                          control={methods.control}
                        />
                        <AmenitiesItem
                          image={<Gym />}
                          title="Gym"
                          name="amenities.gym"
                          control={methods.control}
                        />
                        <AmenitiesItem
                          image={<Electric />}
                          title="Electric charger"
                          name="amenities.electricCharger"
                          control={methods.control}
                        />
                      </div>
                    </div>
                  )}
                  <div className={styles.mobileSearchBtnBlock}>
                    <Button
                      type="submit"
                      text="Search"
                      textColor="#FFFFFF"
                      bgColor="#222"
                      padding="14.5px 28px"
                      fontWeight="600"
                    />
                    <Button
                      text="Extra filters"
                      textColor="#222"
                      bgColor="#ffffff"
                      borderColor="#222"
                      padding="14.5px 28px"
                      fontWeight="600"
                      onClick={() => setExtraFilters((prev) => !prev)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
