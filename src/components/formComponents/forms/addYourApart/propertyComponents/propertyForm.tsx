'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { InputApart } from '../inputApart';
import styles from './property.module.scss';
import { SelectInput } from '../select';

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
        <h3>Location of the property</h3>
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
            {...register('address')}
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
        <h3>General information</h3>
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
            {...register('monthlyPrice')}
            placeholder={'54 244 Re'}
            label={'Monthly rent'}
            name={'monthlyPrice'}
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
            {...register('monthlyPrice')}
            placeholder={'54 244 Re'}
            label={'Monthly rent'}
            name={'monthlyPrice'}
            classNameContainer={styles.apartTitleContainer}
            className={styles.apartTitle}
            required
          />
          <SelectInput
            control={control}
            option={typeOfAppart}
            errors={errors}
            label={`Property type`}
            name={'typeOfAppart'}
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
    </section>
  );
};
