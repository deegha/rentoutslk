'use client';

import React, { useEffect, useState } from 'react';
import styles from './receivedTourRequest.module.scss';
// import BeatLoader from 'react-spinners/BeatLoader';
import { TourRequestProps } from '@/interface/tourRequest';

interface ReceivedTourRequestProps {
  _userData: any;
  idToken: string;
}

type ActiveLink = 'All requests' | 'Accepted' | 'Declined';

const ReceivedTourRequestSection: React.FC<ReceivedTourRequestProps> = ({
  _userData,
  idToken,
}) => {
  const [recievedTourRequestsState, setRecievedTourRequestsState] = useState<
    TourRequestProps[]
  >([]);
  // const [loading, setLoading] = useState(true);
  const [activeLink, setActiveLink] = useState<ActiveLink>('All requests');

  useEffect(() => {
    const fetchRecievedTourRequests = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
        const response = await fetch(
          `${baseUrl}/api/check-recieved-tour-request`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }

        const data = await response.json();

        setRecievedTourRequestsState(data.recievedTourRequests || []);
      } finally {
        setLoading(false);
      }
    };

    fetchRecievedTourRequests();
  }, [idToken]);

  console.log('recievedTourRequestsState', recievedTourRequestsState);

  return (
    <div className={styles.container}>
      <div className={styles.containerProfile}>
        <div className={styles.cardHeader}>
          <h2 className={styles.titleHeader}>Recieved tour requests</h2>
          {recievedTourRequestsState.length > 0 && (
            <div className={styles.typeOfListings}>
              <p
                className={`${activeLink === 'All requests' ? styles.activeLink : styles.link}`}
                onClick={() => setActiveLink('All requests')}
              >
                All listings
              </p>
              <p
                className={`${activeLink === 'Accepted' ? styles.activeLink : styles.link}`}
                onClick={() => setActiveLink('Accepted')}
              >
                Active
              </p>
              <p
                className={`${activeLink === 'Declined' ? styles.activeLink : styles.link}`}
                onClick={() => setActiveLink('Declined')}
              >
                Inactive
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceivedTourRequestSection;
