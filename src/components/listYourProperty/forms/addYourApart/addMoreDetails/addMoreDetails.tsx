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
  { label: 'Studio', value: 'Studio' },
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
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
];
const numbersOfBathrooms = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
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
            placeholder={'e. g. 3 Br Apartment'}
            label={'Apartment title'}
            name={'title'}
            classNameContainer={styles.apartTitleContainer}
            required
          />
          <InputApart
            {...register('place')}
            placeholder={'e. g. Havelock city'}
            label={'Place'}
            name={'place'}
            classNameContainer={styles.apartTitleContainer}
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
            placeholder={'54 244'}
            label={'Monthly rent'}
            name={'monthlyRent'}
            type="number"
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
            label={'Available from*'}
            name={'availableFrom'}
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
          <AmenitiesItem
            name="parking"
            image={<Parking />}
            title="Parking"
            control={control}
          />
          <AmenitiesItem
            name="pool"
            image={<Pool />}
            title="Pool"
            control={control}
          />
          <AmenitiesItem
            name="hotWater"
            image={<HotWater />}
            title="Hot water"
            control={control}
          />
          <AmenitiesItem
            name="tv"
            image={<Tv />}
            title="TV"
            control={control}
          />
          <AmenitiesItem
            name="gym"
            image={<Gym />}
            title="Gym"
            control={control}
          />
          <AmenitiesItem
            name="charger"
            image={<Electric />}
            title="Electric charger"
            control={control}
          />
          <AmenitiesItem
            name="playground"
            image={<Playground />}
            title="Playground"
            control={control}
          />
          <AmenitiesItem
            name="conditioner"
            image={<Conditioner />}
            title="Air conditioner"
            control={control}
          />
          <AmenitiesItem
            name="microwave"
            image={<Microwave />}
            title="Microwave"
            control={control}
          />
          <AmenitiesItem
            name="washingMachine"
            image={<Washing />}
            title="Washing machine"
            control={control}
          />
          <AmenitiesItem
            name="culteries"
            image={<Cultery />}
            title="Culteries"
            control={control}
          />
          <AmenitiesItem
            name="elevator"
            image={<Elevator />}
            title="Elevator"
            control={control}
          />
        </div>
      </div>
    </div>
  );
};
