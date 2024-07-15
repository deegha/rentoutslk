'use client';
import React, { useEffect, useRef } from 'react';
import styles from './shareTooltip.module.scss';

interface ShareTooltipProps {
  onClose: () => void;
  position: { top: number; left: number };
}

export const ShareTooltip: React.FC<ShareTooltipProps> = ({
  onClose,
  position,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={styles.tooltipContainer}
      ref={tooltipRef}
      style={{ top: position.top, left: position.left }}
    >
      <div className={styles.tooltip}>
        <p>Share this property</p>
        <div className={styles.copyLink} onClick={handleCopyLink}>
          <span>Copy link</span>
        </div>
      </div>
    </div>
  );
};
