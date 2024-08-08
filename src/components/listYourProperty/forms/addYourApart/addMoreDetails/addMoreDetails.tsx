'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import styles from '../propertyComponents/property.module.scss';

import { InputApart } from '../inputApart';
import { SelectInput } from '../select';
import { AmenitiesItem } from '../amenitiesItem';
import { DateSelect } from '../dateSelect';

import Parking from '@/icons/parking.svg';
import Pool from '@/icons/pool.svg';
import HotWater from '@/icons/bath.svg';
import Tv from '@/icons/tv.svg';
import Gym from '@/icons/gym.svg';
import Electric from '@/icons/electric.svg';
import Playground from '@/icons/playground.svg';
import Conditioner from '@/icons/conditioner.svg';
import Microwave from '@/icons/microwave.svg';
import Washing from '@/icons/washing.svg';
import Cultery from '@/icons/cultery.svg';
import Elevator from '@/icons/elevator.svg';

const typeOfAppart = [
  { label: 'Apartment', value: 'Apartment' },
  { label: 'House', value: 'House' },
];
const typeOfRent = [
  { label: 'Unlimited', value: 'unlimited' },
  { label: '1 Month', value: '1 Month' },
  { label: '3 Month', value: '3 Month' },
  { label: '6 Month', value: '6 Month' },
  { label: '1 Year', value: '1 Year' },
];
const numbersOfBedrooms = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
];
const numbersOfBathrooms = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
];

export const AddMoreDetails = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <div>
      <div className={styles.location}>
        <h3 className={styles.categoryTitle}>Location of the property</h3>
        <div className={styles.locationInputs}>
          <InputApart
            {...register('address')}
            placeholder={'Address'}
            label={'Address'}
            name={'address'}
            classNameContainer={styles.apartTitleContainer}
            required
          />
          <InputApart
            {...register('title')}
            placeholder={'e. g. 3 Br Apartment in Havelock city'}
            label={'Apartment title'}
            name={'title'}
            classNameContainer={styles.apartTitleContainer}
            className={styles.apartTitle}
            required
          />
        </div>
      </div>
      <div>
        <h3 className={styles.categoryTitle}>General information</h3>
        <div className={styles.generalInfoContainer}>
          <SelectInput
            control={control}
            option={typeOfAppart}
            errors={errors}
            label={`Property type`}
            name={'propertyType'}
          />
          <SelectInput
            control={control}
            option={typeOfRent}
            errors={errors}
            label={`Rental period`}
            name={`rentalPeriod`}
            isDefaultOption
          />
          <InputApart
            {...register('monthlyRent')}
            placeholder={'54 244 Re'}
            label={'Monthly rent'}
            name={'monthlyRent'}
            classNameContainer={styles.apartTitleContainer}
            className={styles.apartTitle}
            required
          />
        </div>
        <div className={styles.generalInfoContainer}>
          <InputApart
            {...register('deposit')}
            placeholder={'80 000 Re'}
            label={'Deposit'}
            name={'deposit'}
            classNameContainer={styles.apartTitleContainer}
            className={styles.apartTitle}
            required
          />
          <SelectInput
            control={control}
            option={numbersOfBedrooms}
            errors={errors}
            label={`Number of bedrooms`}
            name={'numberBedrooms'}
          />
          <SelectInput
            control={control}
            option={numbersOfBathrooms}
            errors={errors}
            label={`Number of bathrooms`}
            name={`numberBathrooms`}
          />
        </div>
        <div className={styles.generalInfoContainer}>
          <InputApart
            {...register('floorArea')}
            placeholder={'Floor area in sq ft'}
            label={'Floor area'}
            name={'floorArea'}
            classNameContainer={styles.apartTitleContainer}
            className={styles.apartTitle}
            required
          />
          <DateSelect
            label="Available from*"
            name="availableFrom"
            register={register}
          />
          <SelectInput
            control={control}
            option={[
              { label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
            ]}
            errors={errors}
            label={`Furnishing`}
            name={`furnishing`}
            isDefaultOption
          />
        </div>
      </div>
      <div className={styles.ameneties}>
        <h3 className={styles.categoryTitle}>Add amenities</h3>
        <div className={styles.amenitiesContainer}>
          <AmenitiesItem image={<Parking />} title="Parking" />
          <AmenitiesItem image={<Pool />} title="Pool" />
          <AmenitiesItem image={<HotWater />} title="Hot water" />
          <AmenitiesItem image={<Tv />} title="TV" />
          <AmenitiesItem image={<Gym />} title="Gym" />
          <AmenitiesItem image={<Electric />} title="Electric charger" />
          <AmenitiesItem image={<Playground />} title="Playground" />
          <AmenitiesItem image={<Conditioner />} title="Air conditioner" />
          <AmenitiesItem image={<Microwave />} title="Microwave" />
          <AmenitiesItem image={<Washing />} title="Washing machine" />
          <AmenitiesItem image={<Cultery />} title="Culteries" />
          <AmenitiesItem image={<Elevator />} title="Elevator" />
        </div>
      </div>
    </div>
  );
};
