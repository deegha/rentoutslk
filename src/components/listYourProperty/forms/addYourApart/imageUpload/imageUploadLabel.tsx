import React, { useState } from 'react';
import styles from './imageUpload.module.scss';

import UploadImg from '@/icons/uploadImg.svg';
import UploadImgHover from '@/icons/uploadImgHover.svg';
import DeleteImgIcon from '@/icons/deleteImg.svg';
import Featured from '@/icons/featured.svg';
import Unfeatured from '@/icons/unfeatured.svg';

interface ImageUploadLabelProps {
  imageIndex: number;
  preview: string;
  onChange: (
    _event: React.ChangeEvent<HTMLInputElement>,
    _imageIndex: number,
  ) => void;
  onDelete: (_imageIndex: number) => void;
  isFeatured: boolean;
  onFeatureClick: (_imageIndex: number) => void;
}

export const ImageUploadLabel: React.FC<ImageUploadLabelProps> = ({
  imageIndex,
  preview,
  onChange,
  onDelete,
  isFeatured,
  onFeatureClick,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [disableInput, setDisableInput] = useState(false);

  const handleRemoveImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setDisableInput(true);
    onDelete(imageIndex);

    setTimeout(() => {
      setDisableInput(false);
    }, 100);
  };

  const handleFeatureClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onFeatureClick(imageIndex);
  };

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (preview || disableInput) {
      event.preventDefault();
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
      className={`${styles.imageUploadLabel} ${
        preview ? styles.uploaded : styles.empty
      }`}
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
        </>
      )}
      <input
        type="file"
        accept=".png,.jpg,.jpeg,.webp"
        onChange={(e) => onChange(e, imageIndex)}
        className={styles.hiddenInput}
        onClick={handleInputClick}
      />
    </label>
  );
};
