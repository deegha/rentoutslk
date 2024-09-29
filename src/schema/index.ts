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
  place: z.string().min(1, 'Place is required'),
  propertyType: z.string().min(1, 'Property type is required'),
  rentalPeriod: z.string().min(1, 'Rental period is required'),
  monthlyRent: z.number().min(1, 'Monthly rent is required'),
  deposit: z.string().min(1, 'Deposit is required'),
  numberBedrooms: z.string().min(1, 'Number of bedrooms is required'),
  numberBathrooms: z.string().min(1, 'Number of bathrooms is required'),
  floorArea: z.string().min(1, 'Floor area is required'),
  availableFrom: z.string().min(1, 'Available from date is required'),
  furnishing: z.string().min(1, 'Furnishing status is required'),
  parking: z.boolean().optional(),
  pool: z.boolean().optional(),
  hotWater: z.boolean().optional(),
  tv: z.boolean().optional(),
  gym: z.boolean().optional(),
  charger: z.boolean().optional(),
  playground: z.boolean().optional(),
  conditioner: z.boolean().optional(),
  microwave: z.boolean().optional(),
  washingMachine: z.boolean().optional(),
  culteries: z.boolean().optional(),
  elevator: z.boolean().optional(),
});

export const imageUploadSchema = z.object({
  image1: z
    .string()
    .min(1, 'Image is required')
    .refine((val) => val.startsWith('data:image'), {
      message: 'Invalid image format',
    }),
  image2: z
    .string()
    .min(1, 'Image is required')
    .refine((val) => val.startsWith('data:image'), {
      message: 'Invalid image format',
    }),
  image3: z
    .string()
    .optional()
    .refine((val) => !val || val.startsWith('data:image'), {
      message: 'Invalid image format',
    }),
  image4: z
    .string()
    .optional()
    .refine((val) => !val || val.startsWith('data:image'), {
      message: 'Invalid image format',
    }),
  image5: z
    .string()
    .optional()
    .refine((val) => !val || val.startsWith('data:image'), {
      message: 'Invalid image format',
    }),
  image6: z
    .string()
    .optional()
    .refine((val) => !val || val.startsWith('data:image'), {
      message: 'Invalid image format',
    }),
  image7: z
    .string()
    .optional()
    .refine((val) => !val || val.startsWith('data:image'), {
      message: 'Invalid image format',
    }),
  image8: z
    .string()
    .optional()
    .refine((val) => !val || val.startsWith('data:image'), {
      message: 'Invalid image format',
    }),
  image9: z
    .string()
    .optional()
    .refine((val) => !val || val.startsWith('data:image'), {
      message: 'Invalid image format',
    }),
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
