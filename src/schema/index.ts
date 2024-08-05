import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const propertyDetailsSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  title: z.string().min(1, 'Title is required'),
  propertyType: z.string().min(1, 'Property type is required'),
  rentalPeriod: z.string().min(1, 'Rental period is required'),
  monthlyRent: z.string().min(1, 'Monthly rent is required'),
  deposit: z.string().min(1, 'Deposit is required'),
  numberBedrooms: z.string().min(1, 'Number of bedrooms is required'),
  numberBathrooms: z.string().min(1, 'Number of bathrooms is required'),
  floorArea: z.string().min(1, 'Floor area is required'),
  availableFrom: z.string().min(1, 'Available from date is required'),
  furnishing: z.string().min(1, 'Furnishing status is required'),
});

export const imageUploadSchema = z.object({
  image1: z.instanceof(File).optional(),
  image2: z.instanceof(File).optional(),
});

export const questionsFormSchema = z.object({
  question1: z.string().optional(),
  question2: z.string().optional(),
  customQuestion: z.string().optional(),
});

export const addYourAppart = z.object({
  ...propertyDetailsSchema.shape,
  ...imageUploadSchema.shape,
  ...questionsFormSchema.shape,
});
