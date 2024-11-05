import React, { useState } from 'react';
import styles from './RecievedTourRequestCard.module.scss';
import { TourRequestProps } from '@/interface/tourRequest';
import Delete from '@/icons/trash.svg';
import { TourRequestStatusChip } from './tourRequestStatusChip';
import { Button } from '@/components/button/button';
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { Tooltip } from 'react-tooltip';
import ActionModal from '../modal/ActionModal';

interface ReceivedTourRequestCardProps {
  tourRequest: TourRequestProps;
  idToken: string;
  onDelete: (_requestId: string) => void;
}

const RecievedTourRequestCard: React.FC<ReceivedTourRequestCardProps> = ({
  tourRequest,
  idToken,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState(tourRequest.status);
  const [modalInfo, setModalInfo] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const {
    name,
    email,
    phone,
    firstQuestion,
    secondQuestion,
    customQuestion,
    firstAnswer,
    secondAnswer,
    customAnswer,
    message,
    ownerId,
    propertyId,
    city,
    title,
    createdAt,
  } = tourRequest;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const showModal = (title: string, message: string) =>
    setModalInfo({ title, message });
  const closeModal = () => setModalInfo(null);

  const createdDate = createdAt?.seconds
    ? new Date(createdAt.seconds * 1000)
    : null;

  const formattedDate = createdDate
    ? isToday(createdDate)
      ? format(createdDate, 'HH:mm')
      : isYesterday(createdDate)
        ? `Yesterday, ${format(createdDate, 'HH:mm')}`
        : format(createdDate, 'dd.MM.yyyy HH:mm')
    : 'N/A';

  const timeAgo = createdDate
    ? formatDistanceToNow(createdDate, { addSuffix: true })
    : 'N/A';

  const handleAccept = async () => {
    try {
      const response = await fetch(`/api/check-recieved-tour-request/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ requestId: tourRequest.id }),
      });

      if (response.ok) {
        setStatus('accepted');
        showModal(
          'Request accepted',
          'Now, it’s your turn to make a move! Get in touch with the tenant via email or by phone and arrange a tour!',
        );
      } else {
        console.error('Failed to accept request');
      }
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleDecline = async () => {
    try {
      const response = await fetch(`/api/check-recieved-tour-request/decline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ requestId: tourRequest.id }),
      });

      if (response.ok) {
        setStatus('declined');
        showModal(
          'Request declined',
          'You will find a tenant who is right for you!',
        );
      } else {
        console.error('Failed to decline request');
      }
    } catch (error) {
      console.error('Error declining request:', error);
    }
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      const response = await fetch(`/api/check-recieved-tour-request/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ requestId: tourRequest.id, ownerId }),
      });

      if (response.ok) {
        setStatus('deleted');
        if (tourRequest.id) {
          onDelete(tourRequest.id);
        }
      } else {
        console.error('Failed to delete request');
      }
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div
        className={`${styles.mainContainer} ${isExpanded ? styles.expanded : ''}`}
        onClick={toggleExpand}
      >
        <div className={styles.contentContainer}>
          <div className={styles.detailsBlock}>
            <div className={styles.requestBlock}>
              <a
                href={`https://rentoutslk.vercel.app/property/${propertyId}`}
                target="_blank"
                className={styles.requestTitle}
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {title} in {city}
              </a>
            </div>
            <div>
              <p className={styles.from}>
                From: <span className={styles.name}>{name}</span>
              </p>
            </div>
          </div>
          <div className={styles.actionsBlock}>
            <TourRequestStatusChip status={status} />
            <div
              className={styles.btn}
              data-tooltip-id={`tooltip-delete`}
              id="clickable"
              data-tooltip-delay-hide={400}
              onClick={handleDelete}
            >
              <Delete />
            </div>
            <Tooltip
              id={`tooltip-delete`}
              style={{
                background: '#5E5E5E',
                color: '#fff',
                opacity: `1`,
                borderRadius: '12px',
                padding: '12px 12px',
                boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.17)`,
              }}
              place="bottom"
            >
              <div>Delete request</div>
            </Tooltip>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.additionalInfo}>
          <div className={styles.emailAndTimeBlock}>
            <p className={styles.subtitle}>
              E-mail:{' '}
              <a
                href={`mailto:${email}`}
                className={`${styles.value} ${styles.email}`}
              >
                {email}
              </a>
            </p>
            <p className={styles.time}>
              {formattedDate} ({timeAgo})
            </p>
          </div>
          <div>
            <p className={styles.subtitle}>
              Phone: <span className={styles.value}>{phone}</span>
            </p>
          </div>
          <div className={styles.messages}>
            <p className={styles.subtitle}>Message:</p>
            <div className={styles.messageBox}>
              <div>
                <p className={styles.question}>1 Question:</p>
                <ul className={styles.questionsList}>
                  <li>{firstQuestion}</li>
                  <li>{firstAnswer}</li>
                </ul>
              </div>
              <div>
                <p className={styles.question}>2 Question:</p>
                <ul className={styles.questionsList}>
                  <li>{secondQuestion}</li>
                  <li>{secondAnswer}</li>
                </ul>
              </div>
              <div>
                <p className={styles.question}>Custom Question:</p>
                <ul className={styles.questionsList}>
                  <li>{customQuestion}</li>
                  <li>{customAnswer}</li>
                </ul>
              </div>
              <p className={styles.optionalMessage}>{message}</p>
            </div>
          </div>
          {status === 'pending' && (
            <div className={styles.buttonContainer}>
              <Button
                text="Accept"
                bgColor="#222222"
                textColor="#fff"
                padding="10.5px 39px"
                borderRadius="4px"
                fontWeight="600"
                onClick={handleAccept}
              />
              <Button
                text="Decline"
                bgColor="#fff"
                textColor="#000"
                borderColor="#222222"
                padding="10.5px 39px"
                borderRadius="4px"
                fontWeight="600"
                onClick={handleDecline}
              />
            </div>
          )}
        </div>
      )}
      {modalInfo && (
        <ActionModal
          title={modalInfo.title}
          message={modalInfo.message}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default RecievedTourRequestCard;
