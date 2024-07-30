import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import styles from './imageUpload.module.scss';
import { ImageUploadLabel } from './imageUploadLabel';
import { Dropdown } from '../dropdown';

export const ImageUploadSection = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const [imagePreviews, setImagePreviews] = useState<{ [key: string]: string }>(
    {},
  );
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    imageKey: string,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => ({
          ...prev,
          [imageKey]: reader.result as string,
        }));
        setValue(imageKey, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const setPreview = (imageKey: string, value: string) => {
    setImagePreviews((prev) => ({
      ...prev,
      [imageKey]: value,
    }));
    setValue(imageKey, null);
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
                viewers see when they visit your listing.{' '}
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
        <ImageUploadLabel
          imageKey="image1"
          preview={imagePreviews['image1'] || ''}
          register={register}
          onChange={handleImageChange}
          setPreview={setPreview}
          isFeatured={featuredImage === 'image1'}
          onFeatureClick={handleFeatureClick}
          error={errors.image1?.message?.toString()}
        />
        <ImageUploadLabel
          imageKey="image2"
          preview={imagePreviews['image2'] || ''}
          register={register}
          onChange={handleImageChange}
          setPreview={setPreview}
          isFeatured={featuredImage === 'image2'}
          onFeatureClick={handleFeatureClick}
          error={errors.image2?.message?.toString()}
        />
        <ImageUploadLabel
          imageKey="image3"
          preview={imagePreviews['image3'] || ''}
          register={register}
          onChange={handleImageChange}
          setPreview={setPreview}
          isFeatured={featuredImage === 'image3'}
          onFeatureClick={handleFeatureClick}
          error={errors.image3?.message?.toString()}
        />
        <ImageUploadLabel
          imageKey="image4"
          preview={imagePreviews['image4'] || ''}
          register={register}
          onChange={handleImageChange}
          setPreview={setPreview}
          isFeatured={featuredImage === 'image4'}
          onFeatureClick={handleFeatureClick}
          error={errors.image4?.message?.toString()}
        />
        <ImageUploadLabel
          imageKey="image5"
          preview={imagePreviews['image5'] || ''}
          register={register}
          onChange={handleImageChange}
          setPreview={setPreview}
          isFeatured={featuredImage === 'image5'}
          onFeatureClick={handleFeatureClick}
          error={errors.image5?.message?.toString()}
        />
        <ImageUploadLabel
          imageKey="image6"
          preview={imagePreviews['image6'] || ''}
          register={register}
          onChange={handleImageChange}
          setPreview={setPreview}
          isFeatured={featuredImage === 'image6'}
          onFeatureClick={handleFeatureClick}
          error={errors.image6?.message?.toString()}
        />
        <ImageUploadLabel
          imageKey="image7"
          preview={imagePreviews['image7'] || ''}
          register={register}
          onChange={handleImageChange}
          setPreview={setPreview}
          isFeatured={featuredImage === 'image7'}
          onFeatureClick={handleFeatureClick}
          error={errors.image7?.message?.toString()}
        />
        <ImageUploadLabel
          imageKey="image8"
          preview={imagePreviews['image8'] || ''}
          register={register}
          onChange={handleImageChange}
          setPreview={setPreview}
          isFeatured={featuredImage === 'image8'}
          onFeatureClick={handleFeatureClick}
          error={errors.image8?.message?.toString()}
        />
        <ImageUploadLabel
          imageKey="image9"
          preview={imagePreviews['image9'] || ''}
          register={register}
          onChange={handleImageChange}
          setPreview={setPreview}
          isFeatured={featuredImage === 'image9'}
          onFeatureClick={handleFeatureClick}
          error={errors.image9?.message?.toString()}
        />
      </div>
    </div>
  );
};
