'use client';
import { useEffect, useRef } from 'react';

interface ViewTrackerProps {
  propertyId: string;
}

const ViewTracker: React.FC<ViewTrackerProps> = ({ propertyId }) => {
  const hasUpdated = useRef(false); // Используем ref вместо состояния

  useEffect(() => {
    const updateViews = async () => {
      if (propertyId && !hasUpdated.current) {
        try {
          const res = await fetch('/api/update-views', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ propertyId }),
          });

          if (!res.ok) {
            throw new Error('Failed to update views');
          }

          hasUpdated.current = true; // Отмечаем, что обновление выполнено
        } catch (error) {
          console.error('Error updating views:', error);
        }
      } else if (!propertyId) {
        console.error('Property ID is missing');
      }
    };

    updateViews();
  }, [propertyId]);

  return null;
};

export default ViewTracker;
