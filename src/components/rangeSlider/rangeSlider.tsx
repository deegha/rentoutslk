'use client';
import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

import styles from './rangeSlider.module.scss';

const STEP = 1;
const MIN = 1;
const MAX = 8;

interface RangeSliderProps {
  label: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({ label }) => {
  const [values, setValues] = useState([1, 8]);

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.sliderContainer}>
        <Range
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => setValues(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                width: '100%',
                borderRadius: '8px',
                background: getTrackBackground({
                  values,
                  colors: ['#222', '#222', '#222'],
                  min: MIN,
                  max: MAX,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '24px',
                width: '24px',
                borderRadius: '12px',
                backgroundColor: '#000',
              }}
            />
          )}
        />
      </div>
      <div className={styles.valueContainer}>
        <span>{values[0]}</span>
        <span>{values[1]}</span>
      </div>
    </div>
  );
};
