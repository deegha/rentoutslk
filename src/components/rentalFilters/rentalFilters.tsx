'use client';
import React, { useState, useEffect } from 'react';
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

const typeOfRent = [
  { label: 'All', value: 'all' },
  { label: 'Apartments', value: 'apartments' },
  { label: 'Studios', value: 'studios' },
  { label: 'Houses', value: 'houses' },
];

export const RentalFilters: React.FC = () => {
  const methods = useForm();
  const [extraFilters, setExtraFilters] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);

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

  return (
    <FormProvider {...methods}>
      <form className={styles.form}>
        <div className={styles.desktopContainer}>
          <div className={styles.filtersBlock}>
            <div className={styles.inputsBlock}>
              <CustomInput
                control={methods.control}
                errors={methods.formState.errors}
                label="Location"
                name="location"
                placeholder="|City, neighbourhood"
              />
              <CustomSelect
                control={methods.control}
                option={typeOfRent}
                errors={methods.formState.errors}
                label="Type"
                name="typeOfRent"
                isDefaultOption
              />
              <CustomInput
                control={methods.control}
                errors={methods.formState.errors}
                label="Max. rent"
                name="maxRent"
                placeholder="|Max rent"
              />
              <RangeSlider label="Number of bedrooms" />
            </div>
            <div className={styles.filterBtnBlock}>
              <Button
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
              <input type="checkbox" className={styles.checkbox} />
            </label>
          </div>
          {extraFilters && (
            <div className={styles.extraFiltersBlock}>
              <div className={styles.extraFiltersRow}>
                <RangeSlider label="Number of bathrooms" />
                <div className={styles.amenitiesList}>
                  <AmenitiesItem image={<Parking />} title="Parking" />
                  <AmenitiesItem image={<Pool />} title="Pool" />
                  <AmenitiesItem image={<HotWater />} title="Hot water" />
                  <AmenitiesItem image={<Tv />} title="TV" />
                  <AmenitiesItem image={<Gym />} title="Gym" />
                  <AmenitiesItem
                    image={<Electric />}
                    title="Electric charger"
                  />
                </div>
              </div>
              <div className={styles.dateSelectBlock}>
                <DateSelect label="Moving in from" fontWeight="600" />
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
                      name="location"
                      placeholder="|City, neighbourhood"
                    />
                    <CustomSelect
                      control={methods.control}
                      option={typeOfRent}
                      errors={methods.formState.errors}
                      label="Type"
                      name="typeOfRent"
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
                      <input type="checkbox" className={styles.checkbox} />
                    </label>
                    <RangeSlider label="Number of bedrooms" />
                  </div>
                  {extraFilters && (
                    <div className={styles.mobileExtraFilters}>
                      <RangeSlider label="Number of bathrooms" />
                      <div className={styles.dateSelectBlock}>
                        <DateSelect label="Moving in from" fontWeight="600" />
                      </div>
                      <div className={styles.amenitiesList}>
                        <AmenitiesItem image={<Parking />} title="Parking" />
                        <AmenitiesItem image={<Pool />} title="Pool" />
                        <AmenitiesItem image={<HotWater />} title="Hot water" />
                        <AmenitiesItem image={<Tv />} title="TV" />
                        <AmenitiesItem image={<Gym />} title="Gym" />
                        <AmenitiesItem
                          image={<Electric />}
                          title="Electric charger"
                        />
                      </div>
                    </div>
                  )}
                  <div className={styles.mobileSearchBtnBlock}>
                    <Button
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
