import Image from 'next/image';
import React from 'react';

export const InAuthed = () => {
  return (
    <div className="lockContainer">
      <div className="containerLockAndText">
        <Image
          src={'/images/profile/lock.png'}
          alt={''}
          width={400}
          height={400}
          className="lockImage"
        />
        <p className="accountDeleted">Account is deleted </p>
      </div>
    </div>
  );
};
