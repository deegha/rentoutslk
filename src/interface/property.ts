export interface PropertyProps {
  address: string;
  availableFrom?: string;
  deposit?: string;
  floorArea: string;
  propertyType: string;
  monthlyRent: string;
  title: string;
  image1: string;
  image2: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  image7?: string;
  image8?: string;
  image9?: string;
  numberBedrooms: string;
  numberBathrooms: string;
  createdAt: { seconds: number; nanoseconds: number };
  views: string;
  favorite: string;
  active: boolean;
  id: string;
  userId: string;
  furnishing: string;
  customQuestion?: string;
  status: string;
}
