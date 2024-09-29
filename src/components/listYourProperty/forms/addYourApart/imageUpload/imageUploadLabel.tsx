import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './imageUpload.module.scss';

import UploadImg from '@/icons/uploadImg.svg';
import UploadImgHover from '@/icons/uploadImgHover.svg';
import DeleteImgIcon from '@/icons/deleteImg.svg';
import Featured from '@/icons/featured.svg';
import Unfeatured from '@/icons/unfeatured.svg';

interface ImageUploadLabelProps {
  imageKey: string;
  preview: string;
  register: UseFormRegister<Record<string, unknown>>;
  onChange: (
    _event: React.ChangeEvent<HTMLInputElement>,
    _imageKey: string,
  ) => void;
  setPreview: (_imageKey: string, _value: string) => void;
  isFeatured: boolean;
  onFeatureClick: (_imageKey: string) => void;
  error?: string;
}

export const ImageUploadLabel: React.FC<ImageUploadLabelProps> = ({
  imageKey: _imageKey,
  preview,
  register,
  onChange: _onChange,
  setPreview,
  isFeatured,
  onFeatureClick: _onFeatureClick,
  error,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleRemoveImage = (_event: React.MouseEvent) => {
    _event.stopPropagation();
    setPreview(_imageKey, '');
  };

  const handleFeatureClick = (_event: React.MouseEvent) => {
    _event.stopPropagation();
    _onFeatureClick(_imageKey);
  };

  const handleInputClick = (_event: React.MouseEvent<HTMLInputElement>) => {
    if (preview) {
      _event.preventDefault();
    }
  };

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <label
      className={`${styles.imageUploadLabel} ${preview ? styles.uploaded : styles.empty}`}
      style={{ backgroundImage: `url(${preview})` }}
    >
      {!preview && (
        <div className={styles.uploadEmptyBlock}>
          <UploadImg className={styles.uploadImg} />
          <UploadImgHover className={styles.uploadImgHover} />
          <p className={styles.uploadText}>Upload image</p>
        </div>
      )}
      {preview && (
        <>
          <div className={styles.deleteImgBlock}>
            <div
              className={styles.featuredIcon}
              onClick={handleFeatureClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {isFeatured ? <Featured /> : <Unfeatured />}
              {isTooltipVisible && (
                <div className={styles.tooltip}>
                  By pressing this checkbox you may feature this image
                </div>
              )}
            </div>
            <div className={styles.deleteImg} onClick={handleRemoveImage}>
              <DeleteImgIcon className={styles.deleteImgIcon} />
              <p className={styles.deleteImgText}>Delete image</p>
            </div>
          </div>
          {error && <span className={styles.error}>{error}</span>}
        </>
      )}
      <input
        type="file"
        accept=".png,.jpg,.jpeg,.webp"
        {...register(_imageKey)}
        onChange={(e) => _onChange(e, _imageKey)}
        className={styles.hiddenInput}
        onClick={handleInputClick}
      />
    </label>
  );
};
