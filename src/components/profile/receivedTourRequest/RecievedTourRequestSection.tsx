'use client';

import React, { useEffect, useState } from 'react';
import styles from './receivedTourRequest.module.scss';
import BeatLoader from 'react-spinners/BeatLoader';
import { TourRequestProps } from '@/interface/tourRequest';
import RecievedTourRequestCard from './tourRequestCard/RecievedTourRequestCard';
import { CustomSelect } from '@/components';

interface ReceivedTourRequestSectionProps {
  _userData: any;
  idToken: string;
}

interface OptionType {
  value: string;
  label: string;
}

type ActiveLink = 'All requests' | 'Accepted' | 'Declined';

const requestOptions = [
  { value: 'All requests', label: 'All requests' },
  { value: 'Accepted', label: 'Accepted' },
  { value: 'Declined', label: 'Declined' },
];

const ReceivedTourRequestSection: React.FC<ReceivedTourRequestSectionProps> = ({
  _userData,
  idToken,
}) => {
  const [requests, setRequests] = useState<TourRequestProps[]>([]);
  const [loading, setLoading] = useState(true);
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
          throw new Error('Failed to fetch tour requests');
        }

        const data = await response.json();
        setRequests(data.receivedTourRequests || []);
      } finally {
        setLoading(false);
      }
    };

    fetchRecievedTourRequests();
  }, [idToken]);

  const filteredTourRequests = requests.filter((request) => {
    if (activeLink === 'All requests') return true;
    if (activeLink === 'Accepted') return request.status === 'accepted';
    if (activeLink === 'Declined') return request.status === 'declined';
    return false;
  });

  const handleDeleteRequest = (requestId: string) => {
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== requestId),
    );
  };

  const handleSelectChange = (e: OptionType | null) => {
    setActiveLink(e ? (e.value as ActiveLink) : 'All requests');
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerProfile}>
        <div className={styles.cardHeader}>
          <h2 className={styles.titleHeader}>Received tour requests</h2>
          {requests.length > 0 && (
            <>
              <div className={styles.typeOfListings}>
                <p
                  className={`${activeLink === 'All requests' ? styles.activeLink : styles.link}`}
                  onClick={() => setActiveLink('All requests')}
                >
                  All requests
                </p>
                <p
                  className={`${activeLink === 'Accepted' ? styles.activeLink : styles.link}`}
                  onClick={() => setActiveLink('Accepted')}
                >
                  Accepted
                </p>
                <p
                  className={`${activeLink === 'Declined' ? styles.activeLink : styles.link}`}
                  onClick={() => setActiveLink('Declined')}
                >
                  Declined
                </p>
              </div>
              <div className={styles.typeOfListingsMobile}>
                <CustomSelect
                  control={undefined}
                  option={requestOptions}
                  name="filter"
                  onChange={handleSelectChange}
                  errors={{}}
                  isDefaultOption={true}
                />
              </div>
            </>
          )}
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '25vh' }}>
            <BeatLoader color="#DE225C" />
          </div>
        ) : filteredTourRequests && filteredTourRequests.length > 0 ? (
          <div className={styles.tourRequestsList}>
            {filteredTourRequests.map((tourRequest) => (
              <RecievedTourRequestCard
                key={tourRequest.id}
                tourRequest={tourRequest}
                idToken={idToken}
                onDelete={handleDeleteRequest}
              />
            ))}
          </div>
        ) : (
          <p>No tour requests found for {activeLink.toLowerCase()}.</p>
        )}
      </div>
    </div>
  );
};

export default ReceivedTourRequestSection;
