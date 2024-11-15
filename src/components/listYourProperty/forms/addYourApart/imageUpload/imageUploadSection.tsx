import React from 'react';
import { useFormContext } from 'react-hook-form';
import styles from './imageUpload.module.scss';
import { ImageUploadLabel } from './imageUploadLabel';
import { Dropdown } from '../dropdown';

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const ImageUploadSection: React.FC = () => {
  const { watch, setValue } = useFormContext();

  const images = watch('images') || [];

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    imageIndex: number,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64String = await toBase64(file);
      const updatedImages = [...images];
      updatedImages[imageIndex] = base64String;
      setValue('images', updatedImages);
    }
  };

  const handleDeleteImage = (imageIndex: number) => {
    const updatedImages = [...images];
    updatedImages.splice(imageIndex, 1);
    setValue('images', updatedImages);
  };

  const handleFeatureClick = (imageIndex: number) => {
    if (imageIndex === 0) return;
    const updatedImages = [...images];
    [updatedImages[0], updatedImages[imageIndex]] = [
      updatedImages[imageIndex],
      updatedImages[0],
    ];
    setValue('images', updatedImages);
  };

  return (
    <div className={styles.addImgContainer}>
      <div className={styles.imgTitleBlock}>
        <h2 className={styles.title}>Add images</h2>
        <p className={styles.subtitle}>
          Upload up to 9 images of your property.
          <br />
          If you want to learn how to do it best, then read our helping
          guidelines.
        </p>
      </div>
      <div className={styles.dropdownContainer}>
        <Dropdown
          title="How to add images?"
          desc={
            <p>
              Photos are crucial for showcasing your property and attracting
              potential renters. To add images, click on the “Upload image”
              field in any of the nine available slots. Select an image from
              your computer and repeat this process to add more images, up to a
              maximum of 9. If you want to change the order of your images,
              simply click and drag an image to the desired position.
            </p>
          }
        />
        <Dropdown
          title="How to edit images?"
          desc={
            <p>
              To delete an image, click on the image you want to remove, and a
              delete icon will appear. Place the best images first to capture
              the attention of potential renters.
            </p>
          }
        />
        <Dropdown
          title="Tips to get the best photos"
          desc={
            <>
              <p>
                To get the best photos, ensure your images are clear and
                high-resolution. Use natural light by taking photos during the
                day with curtains and blinds open, and avoid harsh shadows or
                overly bright and dark spots.
              </p>
              <p>
                Make sure rooms are clean and free of clutter, and remove
                personal items to create a neutral and inviting space. Focus on
                unique selling points such as a modern kitchen, spacious living
                area, or beautiful garden, and include photos of all key rooms:
                living room, kitchen, bedrooms, and bathrooms.
              </p>
              <p>
                Using a tripod helps to take steady shots and avoid blurry
                images.
              </p>
            </>
          }
        />
        <Dropdown
          title="How to feature an image?"
          desc={
            <>
              <p>
                To feature an image, start by deciding which image best
                represents your property and would attract the most interest
                from potential renters. The featured image is the first one
                viewers see when they visit your listing.
              </p>
              <p>
                To set an image as featured, click on the feature icon in the
                upper right corner of each image.
              </p>
            </>
          }
        />
      </div>
      <div className={styles.imgList}>
        {Array.from({ length: 9 }, (_, index) => (
          <ImageUploadLabel
            key={index}
            imageIndex={index}
            preview={images[index] || ''}
            onChange={handleImageChange}
            onDelete={handleDeleteImage}
            isFeatured={index === 0}
            onFeatureClick={handleFeatureClick}
          />
        ))}
      </div>
    </div>
  );
};
