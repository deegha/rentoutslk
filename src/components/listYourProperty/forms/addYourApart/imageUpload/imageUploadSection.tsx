import React, { useState } from 'react';
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
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const [imagePreviews, setImagePreviews] = useState<{ [key: string]: string }>(
    {},
  );
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    imageKey: string,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(imageKey, previewUrl);

      // Convert the file to a base64 string
      const base64String = await toBase64(file);
      setValue(imageKey, base64String); // Save the base64 string in form state
    } else {
      console.log('Input not instance of File');
    }
  };

  const setPreview = (imageKey: string, value: string) => {
    setImagePreviews((prev) => ({
      ...prev,
      [imageKey]: value,
    }));
    if (imageKey === featuredImage) {
      setFeaturedImage(null);
    }
  };

  const handleFeatureClick = (imageKey: string) => {
    setFeaturedImage(imageKey);
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
              delete icon will appear. To change the order of your images, click
              and drag them to the desired position. Changes are saved
              automatically. Place the best images first to capture the
              attention of potential renters.
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
                To set an image as featured, look for the feature icon in the
                upper right corner of each image. Click on this icon to select
                the image as your featured photo.
              </p>
            </>
          }
        />
      </div>
      <div className={styles.imgList}>
        {Array.from({ length: 9 }, (_, index) => {
          const imageKey = `image${index + 1}`;
          return (
            <ImageUploadLabel
              key={imageKey}
              imageKey={imageKey}
              preview={imagePreviews[imageKey] || ''}
              register={register}
              onChange={handleImageChange}
              setPreview={setPreview}
              isFeatured={featuredImage === imageKey}
              onFeatureClick={handleFeatureClick}
              error={errors[imageKey]?.message?.toString()}
            />
          );
        })}
      </div>
    </div>
  );
};
