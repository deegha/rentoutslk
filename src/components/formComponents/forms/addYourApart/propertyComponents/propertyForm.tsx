'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import styles from './property.module.scss';

import { InputApart } from '../inputApart';
import { SelectInput } from '../select';
import { DateSelect } from '../datePicker';
import { AmenitiesItem } from '../amenitiesItem';

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
  { label: '1 Month', value: 'OneMonth' },
  { label: '3 Month', value: 'ThreeMonth' },
  { label: '6 Month', value: 'SixMonth' },
  { label: '1 Year', value: 'OneYear' },
];
const numbersOfBedrooms = [
  { label: '1', value: 'OneBedrooms' },
  { label: '2', value: 'TwoBedrooms' },
  { label: '3', value: 'ThreeBedrooms' },
  { label: '4', value: 'FourthBedrooms' },
  { label: '5', value: 'FiveBedrooms' },
];
const numbersOfBathrooms = [
  { label: '1', value: 'OneBathrooms' },
  { label: '2', value: 'TwoBathrooms' },
  { label: '3', value: 'ThreeBBathrooms' },
  { label: '4', value: 'FourthBathrooms' },
  { label: '5', value: 'FiveBathrooms' },
];

export const PropertyForm = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <section>
      <div className={styles.location}>
        <h3 className={styles.categoryTitle}>Location of the property</h3>
        <div className={styles.locationInputs}>
          <InputApart
            {...register('address')}
            placeholder={'Address'}
            label={'Address'}
            name={'Address'}
            classNameContainer={styles.apartTitleContainer}
            required
          />
          <InputApart
            {...register('apartTitle')}
            placeholder={'e. g. 3 Br Apartment in Havelock city    '}
            label={'Apartment title'}
            name={'apartmenttitle'}
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
            name={'typeOfAppart'}
          />
          <SelectInput
            control={control}
            option={typeOfRent}
            errors={errors}
            label={`Rental period`}
            name={`typeOfRent`}
            isDefaultOption
          />
          <InputApart
            {...register('monthlyPrice')}
            placeholder={'54 244 Re'}
            label={'Monthly rent'}
            name={'monthlyPrice'}
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
            name={'numbersOfBedrooms'}
          />
          <SelectInput
            control={control}
            option={numbersOfBathrooms}
            errors={errors}
            label={`Number of bathrooms`}
            name={`numbersOfBathrooms`}
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
          <DateSelect />
          {/* <SelectInput
            control={control}
            option={typeOfAppart}
            errors={errors}
            label={`Property type`}
            name={'typeOfAppart'}
          /> */}
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
        <h3 className={styles.categoryTitle}>Add ameneties</h3>
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
    </section>
  );
};
