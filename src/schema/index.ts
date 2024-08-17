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
  // address: z.string().min(1, 'Address is required'),
  // title: z.string().min(1, 'Title is required'),
  // propertyType: z.string().min(1, 'Property type is required'),
  // rentalPeriod: z.string().min(1, 'Rental period is required'),
  // monthlyRent: z.string().min(1, 'Monthly rent is required'),
  // deposit: z.string().min(1, 'Deposit is required'),
  // numberBedrooms: z.string().min(1, 'Number of bedrooms is required'),
  // numberBathrooms: z.string().min(1, 'Number of bathrooms is required'),
  // floorArea: z.string().min(1, 'Floor area is required'),
  // availableFrom: z.string().min(1, 'Available from date is required'),
  // furnishing: z.string().min(1, 'Furnishing status is required'),
  address: z.string().min(1, 'Address is required').optional(),
  title: z.string().min(1, 'Title is required').optional(),
  propertyType: z.string().min(1, 'Property type is required').optional(),
  rentalPeriod: z.string().min(1, 'Rental period is required').optional(),
  monthlyRent: z.string().min(1, 'Monthly rent is required').optional(),
  deposit: z.string().min(1, 'Deposit is required').optional(),
  numberBedrooms: z
    .string()
    .min(1, 'Number of bedrooms is required')
    .optional(),
  numberBathrooms: z
    .string()
    .min(1, 'Number of bathrooms is required')
    .optional(),
  floorArea: z.string().min(1, 'Floor area is required').optional(),
  availableFrom: z
    .string()
    .min(1, 'Available from date is required')
    .optional(),
  furnishing: z.string().min(1, 'Furnishing status is required').optional(),
  parking: z.boolean().optional(),
  pool: z.boolean().optional(),
  hotwater: z.boolean().optional(),
  tv: z.boolean().optional(),
  gym: z.boolean().optional(),
  electric: z.boolean().optional(),
  playground: z.boolean().optional(),
  conditioner: z.boolean().optional(),
  microwave: z.boolean().optional(),
  washing: z.boolean().optional(),
  cultery: z.boolean().optional(),
  elevator: z.boolean().optional(),
});

export const imageUploadSchema = z.object({
  image1: z
    .string()
    .optional()
    .refine((val) => val?.startsWith('data:image'), {
      message: 'Invalid image format',
    }),
  image2: z
    .string()
    .optional()
    .refine((val) => val?.startsWith('data:image'), {
      message: 'Invalid image format',
    }),
  // Add more images as needed
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

export const tourRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  monthlyHousehold: z.string().optional(),
  howLongStay: z.string().optional(),
  bidHigher: z.string().optional(),
  message: z.string().optional(),
});
export type TourRequestFormData = z.infer<typeof tourRequestSchema>;
