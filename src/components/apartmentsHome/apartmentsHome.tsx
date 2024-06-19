import React from 'react';
import { ApartmentsList } from '../apartments/apartmentsList';

export const ApartmentsHome = () => {
  return (
    <section>
      <div>
        <h2>Apartments for you</h2>
        <p>
          This properties are tending. Find a place, contact owner, book a tour.
        </p>
      </div>
      <ApartmentsList />
    </section>
  );
};
