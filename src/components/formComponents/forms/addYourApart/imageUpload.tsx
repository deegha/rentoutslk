import React from 'react';
import { useFormContext } from 'react-hook-form';

const ImageUpload = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2>Add images</h2>
      <label>
        Image 1
        <input type="file" {...register('image1')} />
        {errors.image1 && <span>{errors.image1.message}</span>}
      </label>
      <label>
        Image 2
        <input type="file" {...register('image2')} />
        {errors.image2 && <span>{errors.image2.message}</span>}
      </label>
    </div>
  );
};

export default ImageUpload;
