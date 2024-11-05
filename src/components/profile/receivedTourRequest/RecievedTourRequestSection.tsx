'use client';

import React, { useEffect, useState } from 'react';
import styles from './receivedTourRequest.module.scss';
import BeatLoader from 'react-spinners/BeatLoader';
import { TourRequestProps } from '@/interface/tourRequest';
import RecievedTourRequestCard from './tourRequestCard/RecievedTourRequestCard';
import { CustomSelect } from '@/components';
import { Button } from '@/components';
import DeleteConfirmationModal from './modal/DeleteConfirmationModal';

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
  const [displayedRequests, setDisplayedRequests] = useState<
    TourRequestProps[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [activeLink, setActiveLink] = useState<ActiveLink>('All requests');
  const [displayCount, setDisplayCount] = useState(10);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [_deletedRequestId, setDeletedRequestId] = useState<string | null>(
    null,
  );

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
        setDisplayedRequests(data.receivedTourRequests.slice(0, 10) || []);
      } finally {
        setLoading(false);
      }
    };

    fetchRecievedTourRequests();
  }, [idToken]);

  const handleShowMore = () => {
    const newDisplayCount = displayCount + 10;
    setDisplayCount(newDisplayCount);
    setDisplayedRequests(requests.slice(0, newDisplayCount));
  };

  const filteredTourRequests = displayedRequests.filter((request) => {
    if (activeLink === 'All requests') return true;
    if (activeLink === 'Accepted') return request.status === 'accepted';
    if (activeLink === 'Declined') return request.status === 'declined';
    return false;
  });

  const handleDeleteRequest = (requestId: string) => {
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== requestId),
    );
    setDisplayedRequests((prevDisplayed) =>
      prevDisplayed.filter((request) => request.id !== requestId),
    );

    setDeletedRequestId(requestId);
    setShowDeleteConfirmation(true);
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
      {displayCount < requests.length && (
        <Button
          text="Show more"
          bgColor="#F7F7F7"
          textColor="#000"
          borderColor="#222222"
          padding="10.5px 39px"
          borderRadius="4px"
          fontWeight="600"
          onClick={handleShowMore}
        />
      )}
      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          onClose={() => setShowDeleteConfirmation(false)}
        />
      )}
    </div>
  );
};

export default ReceivedTourRequestSection;
